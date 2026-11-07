"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/data/products";
import styles from "./search-page.module.css";

export function SearchPage({ products, initialQuery }: { products: Product[]; initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => normalized.length < 2 ? [] : products.filter(product =>
    [product.name, product.category, product.collection, product.color, product.pattern].some(value => value.toLowerCase().includes(normalized))
  ), [normalized, products]);

  return <main className={styles.page}>
    <header><p>Explore the collection</p><h1>Search</h1>
      <label><Search size={23}/><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products, colours or collections" aria-label="Search products" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={20}/></button>}</label>
    </header>
    <section className={styles.results} aria-live="polite">
      {normalized.length < 2 ? <div className={styles.prompt}><h2>What are you looking for?</h2><p>Try “Cabana”, “navy”, “bikini” or “swim shorts”.</p></div>
        : results.length ? <><div className={styles.resultHeading}><h2>Results</h2><span>{results.length} {results.length === 1 ? "product" : "products"}</span></div><div className={styles.grid}>{results.map(product => <ProductCard key={product.slug} product={product}/>)}</div></>
        : <div className={styles.prompt}><h2>No products found</h2><p>Try a broader term or browse the complete collection.</p><Link href="/collections/riviera-club">SHOP ALL PRODUCTS</Link></div>}
    </section>
  </main>;
}
