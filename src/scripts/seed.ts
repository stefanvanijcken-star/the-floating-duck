import path from "node:path";
import { getFileByPath, getPayload } from "payload";
import config from "@payload-config";
import { bestSellers, products, rivieraHighlights, type Product } from "../data/products.js";

type MediaView = "front" | "back" | "lifestyle" | "detail";

const payload = await getPayload({ config });
const projectRoot = process.cwd();

const getView = (imagePath: string): MediaView => {
  if (imagePath.includes("back")) return "back";
  if (imagePath.includes("lifestyle") || imagePath.includes("hover")) return "lifestyle";
  if (imagePath.includes("detail")) return "detail";
  return "front";
};

const getAudience = (product: Product) => {
  if (product.category === "Swim Shorts") return "men" as const;
  if (["Bikini Tops", "Bikini Bottoms", "Swimsuits"].includes(product.category)) return "women" as const;
  return "unisex" as const;
};

const getAlt = (product: Product, imagePath: string) => {
  const labels: Record<MediaView, string> = {
    front: "front view",
    back: "back view",
    lifestyle: "worn by a model beside a swimming pool",
    detail: "detail view",
  };
  return `${product.name}, ${labels[getView(imagePath)]}.`;
};

const mediaByPath = new Map<string, number>();

for (const product of products) {
  const imagePaths = new Set([
    product.image,
    product.hoverImage,
    ...(product.gallery ?? []),
  ].filter((value): value is string => Boolean(value)));

  for (const imagePath of imagePaths) {
    if (mediaByPath.has(imagePath)) continue;

    const filename = path.basename(imagePath);
    const existing = await payload.find({
      collection: "media",
      limit: 1,
      overrideAccess: true,
      where: { filename: { equals: filename } },
    });

    if (existing.docs[0]) {
      mediaByPath.set(imagePath, existing.docs[0].id);
      continue;
    }

    const absolutePath = path.join(projectRoot, "public", imagePath.replace(/^\//, ""));
    const media = await payload.create({
      collection: "media",
      data: { alt: getAlt(product, imagePath) },
      file: await getFileByPath(absolutePath),
      overrideAccess: true,
    });
    mediaByPath.set(imagePath, media.id);
  }
}

const productIDs = new Map<string, number>();

for (const [index, product] of products.entries()) {
  const existing = await payload.find({
    collection: "products",
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: product.slug } },
  });

  const galleryPaths = product.gallery?.length ? product.gallery : [product.image];
  const stockPerSize = product.inStock
    ? Math.max(1, Math.floor((product.stockCount ?? product.sizes.length * 8) / product.sizes.length))
    : 0;
  const data = {
    name: product.name,
    slug: product.slug,
    status: "published" as const,
    price: Math.round(product.price * 100),
    currency: "EUR" as const,
    category: product.category,
    audience: getAudience(product),
    collection: product.collection,
    color: product.color,
    pattern: product.pattern,
    mainImage: mediaByPath.get(product.image)!,
    hoverImage: product.hoverImage ? mediaByPath.get(product.hoverImage) : undefined,
    gallery: galleryPaths.map((imagePath) => ({
      image: mediaByPath.get(imagePath)!,
      view: getView(imagePath),
    })),
    variants: product.sizes.map((size) => ({
      size,
      sku: `${product.slug}-${size}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
      stock: stockPerSize,
    })),
    featured: rivieraHighlights.some((candidate) => candidate.slug === product.slug),
    bestSeller: bestSellers.some((candidate) => candidate.slug === product.slug),
    sortOrder: (index + 1) * 10,
  };

  const saved = existing.docs[0]
    ? await payload.update({
        collection: "products",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      })
    : await payload.create({ collection: "products", data, overrideAccess: true });

  productIDs.set(product.slug, saved.id);
}

const pairs: Array<[string, string]> = [
  ["cabana-stripes-bikini-top-light-blue", "cabana-stripes-bikini-bottom-light-blue"],
  ["pool-tiles-bikini-top-navy", "pool-tiles-bikini-bottom-navy"],
];

for (const [topSlug, bottomSlug] of pairs) {
  const topID = productIDs.get(topSlug);
  const bottomID = productIDs.get(bottomSlug);
  if (!topID || !bottomID) continue;

  await payload.update({
    collection: "products",
    id: topID,
    data: { pairedProduct: bottomID },
    overrideAccess: true,
  });
  await payload.update({
    collection: "products",
    id: bottomID,
    data: { pairedProduct: topID },
    overrideAccess: true,
  });
}

console.log(`Imported ${products.length} products and ${mediaByPath.size} unique images.`);
