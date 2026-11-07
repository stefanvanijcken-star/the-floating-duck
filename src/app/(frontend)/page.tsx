import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { ProductCard } from "@/components/product/product-card";
import { getProducts } from "@/lib/cms-products";
import type { Product } from "@/data/products";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

function ProductSection({ title, products, button }: { title: string; products: Product[]; button: string }) {
  return <section className={styles.productSection}><div className={styles.sectionHeading}><h2>{title}</h2><Link href="/collections/riviera-club">{button}</Link></div><div className={styles.grid}>{products.map(product => <ProductCard key={product.slug} product={product} />)}</div></section>;
}

export default async function Home() {
  const catalog = await getProducts();
  const bestSellers = catalog.filter(product => product.bestSeller).slice(0, 3);
  const highlights = catalog.filter(product => product.featured).slice(0, 3);

  return <>
    <Hero image="/assets/images/home/riviera-club-hero.png" eyebrow="Luxury swimwear created with care" title="Riviera Club Collection" height="large" buttons={[{ label: "New arrivals", href: "/collections/riviera-club" }, { label: "Shop collection", href: "/collections/riviera-club" }]} />
    <ProductSection title="Best Sellers" products={bestSellers.length ? bestSellers : catalog.slice(0, 3)} button="VIEW MORE" />
    <Hero image="/assets/images/home/summer-collection-2026-banner.png" eyebrow="Luxury swimwear created with care" title="Summer Collection ‘26" buttons={[{ label: "Shop new in", href: "/collections/riviera-club" }, { label: "Shop all swimwear", href: "/collections/riviera-club" }]} />
    <ProductSection title="Riviera Club Collection" products={highlights.length ? highlights : catalog.slice(0, 3)} button="VIEW ALL" />
  </>;
}
