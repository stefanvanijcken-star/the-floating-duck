import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/product/product-page-view";
import { getProductBySlug, getProducts } from "@/lib/cms-products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name } : { title: "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await getProducts();
  const product = catalog.find(item => item.slug === slug);
  if (!product) notFound();
  return <ProductPageView product={product} products={catalog} />;
}
