import { CollectionGrid } from "@/components/collection/collection-grid";
import { emptyProductFilters, type AvailabilityFilter, type ProductFilters } from "@/components/collection/filter-model";
import { getProducts } from "@/lib/cms-products";
import type { ProductCategory, ProductPattern } from "@/data/products";
import styles from "./page.module.css";

export const metadata = { title: "Shop Swimwear" };
export const dynamic = "force-dynamic";

type CollectionSearchParams = {
  category?: string | string[];
  collection?: string | string[];
  color?: string | string[];
  size?: string | string[];
  pattern?: string | string[];
  availability?: string | string[];
  min?: string | string[];
  max?: string | string[];
  sort?: string | string[];
};

type SortKey = "featured" | "price-asc" | "price-desc" | "collection";

const patternValues: ProductPattern[] = ["Solid", "Print", "Striped", "Dotted"];
const availabilityValues: AvailabilityFilter[] = ["in-stock", "out-of-stock"];
const sortValues: SortKey[] = ["featured", "price-asc", "price-desc", "collection"];

function valuesOf(value?: string | string[]) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

function validValues<T extends string>(value: string | string[] | undefined, allowed: readonly T[]) {
  return valuesOf(value).filter((item): item is T => allowed.includes(item as T));
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function priceValue(value?: string | string[]) {
  const parsed = Number(firstValue(value));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function pageHeading(filters: ProductFilters) {
  if (filters.collections.length === 1) return `${filters.collections[0]} Collection`;
  if (filters.categories.length === 1 && filters.categories[0] === "Swim Shorts") return "Mens Swimwear";
  if (filters.categories.some(category => ["Bathing Towels", "Caps", "Socks"].includes(category))) return "Accessories";
  if (filters.categories.some(category => ["Bikini Tops", "Bikini Bottoms", "Swimsuits"].includes(category))) return "Womens Swimwear";
  return "Riviera Club Collection";
}

export default async function CollectionPage({ searchParams }: { searchParams: Promise<CollectionSearchParams> }) {
  const [query, products] = await Promise.all([searchParams, getProducts()]);
  const categoryValues = [...new Set(products.map(product => product.category))] as ProductCategory[];
  const productCollections = [...new Set(products.map(product => product.collection))];
  const productColors = [...new Set(products.map(product => product.color))];
  const productSizes = [...new Set(products.flatMap(product => product.sizes))];
  const initialFilters: ProductFilters = {
    ...emptyProductFilters,
    categories: validValues(query.category, categoryValues),
    collections: validValues(query.collection, productCollections),
    colors: validValues(query.color, productColors),
    sizes: validValues(query.size, productSizes),
    patterns: validValues(query.pattern, patternValues),
    availability: validValues(query.availability, availabilityValues),
    priceMin: priceValue(query.min),
    priceMax: priceValue(query.max),
  };
  const requestedSort = firstValue(query.sort);
  const initialSort: SortKey = sortValues.includes(requestedSort as SortKey) ? requestedSort as SortKey : "featured";
  const stateKey = JSON.stringify({ initialFilters, initialSort });

  return <div>
    <section className={styles.title}><h1>{pageHeading(initialFilters)}</h1></section>
    <CollectionGrid key={stateKey} products={products} initialFilters={initialFilters} initialSort={initialSort} />
  </div>;
}
