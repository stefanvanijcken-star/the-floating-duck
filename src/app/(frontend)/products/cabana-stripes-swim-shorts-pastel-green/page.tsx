import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/product/product-page-view";
import { getProductBySlug, getProducts } from "@/lib/cms-products";

const slug = "cabana-stripes-swim-shorts-pastel-green";
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product not found" };
}

export default async function ProductPage() {
  const catalog = await getProducts();
  const product = catalog.find(item => item.slug === slug);
  if (!product) notFound();
  return <ProductPageView product={product} products={catalog} />;
}
