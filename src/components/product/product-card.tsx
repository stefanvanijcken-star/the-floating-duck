import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { Price } from "@/components/commerce/price";
import styles from "./product-card.module.css";

const imageSizes = "(max-width: 700px) 50vw, (max-width: 1000px) 50vw, 33vw";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const href = `/products/${product.slug}`;
  return <article className={styles.card}>
    <Link href={href} className={styles.imageWrap}>
      <Image className={styles.primaryImage} src={product.image} alt={product.name} fill loading={eager ? "eager" : "lazy"} sizes={imageSizes} />
      {product.hoverImage && <Image className={styles.hoverImage} src={product.hoverImage} alt="" fill loading="lazy" sizes={imageSizes} />}
    </Link>
    <div className={styles.details}><Link href={href}>{product.name}</Link><Price amount={product.price} /></div>
  </article>;
}