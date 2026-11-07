import "server-only";

import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Product as PayloadProduct } from "@/payload-types";
import {
  bestSellers as fallbackBestSellers,
  products as fallbackProducts,
  rivieraHighlights as fallbackHighlights,
  type Product,
} from "@/data/products";

function mediaURL(media: number | Media | null | undefined, size?: "card") {
  if (!media || typeof media === "number") return null;
  const value = size ? media.sizes?.[size]?.url ?? media.url : media.url;
  if (!value) return null;

  try {
    const parsed = new URL(value);
    return parsed.pathname.startsWith("/api/media/file/") ? `${parsed.pathname}${parsed.search}` : value;
  } catch {
    return value;
  }
}

function richTextToPlainText(value: PayloadProduct["description"]) {
  if (!value) return undefined;
  const text: string[] = [];
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (typeof record.text === "string") text.push(record.text);
    if (Array.isArray(record.children)) record.children.forEach(visit);
  };
  visit(value.root);
  return text.join(" ").replace(/\s+/g, " ").trim() || undefined;
}

function mapProduct(product: PayloadProduct): Product | null {
  const image = mediaURL(product.mainImage, "card");
  if (!image) return null;
  const variants = product.variants.map(variant => ({
    size: variant.size,
    sku: variant.sku,
    stock: Math.max(0, variant.stock),
  }));
  const stockCount = variants.reduce((total, variant) => total + variant.stock, 0);
  const pairedProduct = typeof product.pairedProduct === "object" && product.pairedProduct
    ? product.pairedProduct.slug
    : undefined;

  return {
    slug: product.slug,
    name: product.name,
    price: product.price / 100,
    image,
    category: product.category,
    audience: product.audience,
    color: product.color,
    pattern: product.pattern,
    collection: product.collection,
    description: richTextToPlainText(product.description),
    sizes: variants.map(variant => variant.size),
    variants,
    inStock: stockCount > 0,
    stockCount,
    gallery: product.gallery
      ?.map(item => mediaURL(item.image))
      .filter((value): value is string => Boolean(value)),
    hoverImage: mediaURL(product.hoverImage, "card") ?? undefined,
    pairedProductSlug: pairedProduct,
    featured: Boolean(product.featured),
    bestSeller: Boolean(product.bestSeller),
    sortOrder: product.sortOrder ?? 100,
  };
}

function hydratedFallback() {
  return fallbackProducts.map((product, index) => ({
    ...product,
    audience: product.category === "Swim Shorts"
      ? "men" as const
      : ["Bikini Tops", "Bikini Bottoms", "Swimsuits"].includes(product.category)
        ? "women" as const
        : "unisex" as const,
    variants: product.sizes.map(size => ({
      size,
      sku: `${product.slug}-${size}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
      stock: product.inStock ? Math.max(1, Math.floor((product.stockCount ?? product.sizes.length * 8) / product.sizes.length)) : 0,
    })),
    featured: fallbackHighlights.some(candidate => candidate.slug === product.slug),
    bestSeller: fallbackBestSellers.some(candidate => candidate.slug === product.slug),
    sortOrder: (index + 1) * 10,
    pairedProductSlug: product.slug === "cabana-stripes-bikini-top-light-blue"
      ? "cabana-stripes-bikini-bottom-light-blue"
      : product.slug === "cabana-stripes-bikini-bottom-light-blue"
        ? "cabana-stripes-bikini-top-light-blue"
        : product.slug === "pool-tiles-bikini-top-navy"
          ? "pool-tiles-bikini-bottom-navy"
          : product.slug === "pool-tiles-bikini-bottom-navy"
            ? "pool-tiles-bikini-top-navy"
            : undefined,
  }));
}

export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      depth: 2,
      limit: 250,
      pagination: false,
      overrideAccess: true,
      sort: "sortOrder",
      where: { status: { equals: "published" } },
    });
    const catalog = result.docs.map(mapProduct).filter((product): product is Product => product !== null);
    return catalog.length > 0 ? catalog : hydratedFallback();
  } catch (error) {
    console.error("Could not load products from Payload; using the bundled catalog.", error);
    return hydratedFallback();
  }
});

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find(product => product.slug === slug);
}
