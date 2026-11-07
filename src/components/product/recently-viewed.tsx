"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/data/products";
import styles from "./product-page-view.module.css";

const storageKey = "floating-duck-recently-viewed";
const changeEvent = "floating-duck-recently-viewed-change";
const emptySnapshot = "[]";

function subscribe(callback: () => void) {
  const notify = () => callback();
  window.addEventListener("storage", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey) ?? emptySnapshot;
}

function parseHistory(snapshot: string) {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === "string") as string[] : [];
  } catch {
    return [];
  }
}

export function RecentlyViewed({ currentSlug, fallbackProducts, products }: { currentSlug: string; fallbackProducts: Product[]; products: Product[] }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot);
  const history = useMemo(() => parseHistory(snapshot), [snapshot]);
  const viewedProducts = history
    .filter(slug => slug !== currentSlug)
    .map(slug => products.find(product => product.slug === slug))
    .filter(product => product !== undefined)
    .slice(0, 3);
  const visibleProducts = viewedProducts.length > 0 ? viewedProducts : fallbackProducts;

  useEffect(() => {
    const currentHistory = parseHistory(getSnapshot());
    const nextHistory = [currentSlug, ...currentHistory.filter(slug => slug !== currentSlug)].slice(0, 8);
    window.localStorage.setItem(storageKey, JSON.stringify(nextHistory));
    window.dispatchEvent(new Event(changeEvent));
  }, [currentSlug]);

  if (visibleProducts.length === 0) return null;

  return <section className={styles.recent}>
    <h2>Recently Viewed</h2>
    <div className={styles.recentGrid}>{visibleProducts.map(product => <ProductCard key={product.slug} product={product} />)}</div>
  </section>;
}
