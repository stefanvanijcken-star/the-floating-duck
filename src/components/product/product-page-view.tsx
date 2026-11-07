import { Globe2, LockKeyhole, RefreshCcw, Truck } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { getProductGallery, type Product } from "@/data/products";
import styles from "./product-page-view.module.css";

const serviceBenefits = [
  { label: "Fast Delivery", icon: Truck },
  { label: "30 Day Returns", icon: RefreshCcw },
  { label: "Secure Payments", icon: LockKeyhole },
  { label: "Worldwide Shipping", icon: Globe2 },
];

function uniqueProducts(candidates: Product[]) {
  return candidates.filter((product, index, list) => list.findIndex(item => item.slug === product.slug) === index);
}

function getCompleteSet(product: Product, products: Product[]) {
  const paired = product.pairedProductSlug ? products.find(item => item.slug === product.pairedProductSlug) : undefined;
  return uniqueProducts([
    ...(paired ? [paired] : []),
    ...products.filter(item => item.slug !== product.slug && item.collection === product.collection && item.color === product.color && item.category !== product.category),
    ...products.filter(item => item.slug !== product.slug && item.color === product.color && item.category !== product.category),
    ...products.filter(item => item.slug !== product.slug && item.collection === product.collection && item.category !== product.category),
  ]).slice(0, 3);
}

function getRecommendations(product: Product, products: Product[]) {
  return uniqueProducts([
    ...products.filter(item => item.slug !== product.slug && item.collection === product.collection),
    ...products.filter(item => item.slug !== product.slug && item.category === product.category),
    ...products.filter(item => item.slug !== product.slug),
  ]).slice(0, 3);
}

export function ProductPageView({ product, products }: { product: Product; products: Product[] }) {
  const completeSet = getCompleteSet(product, products);
  const recommendations = getRecommendations(product, products);

  return <>
    <section className={styles.productTop}>
      <ProductGallery images={getProductGallery(product)} productName={product.name.replace(" | ", " in ")} />
      <ProductPurchase key={product.slug} product={product} products={products} />
    </section>

    {completeSet.length > 0 && <section className={styles.set}>
      <h2>Complete The Set</h2>
      <div className={styles.setGrid}>{completeSet.map(item => <ProductCard key={item.slug} product={item} />)}</div>
    </section>}

    <Hero image="/assets/images/home/shop-the-look-banner.png" eyebrow={product.collection + " Collection"} title="Shop The Look" buttons={[{ label: "See more looks", href: "/collections/riviera-club" }, { label: "Shop collection", href: `/collections/riviera-club?collection=${encodeURIComponent(product.collection)}` }]} />

    <RecentlyViewed currentSlug={product.slug} fallbackProducts={recommendations} products={products} />

    <section className={styles.services} aria-label="Shopping benefits">
      {serviceBenefits.map(({ label, icon: Icon }) => <div className={styles.service} key={label}>
        <span><Icon size={24} strokeWidth={1.5} /></span>
        <strong>{label}</strong>
      </div>)}
    </section>
  </>;
}
