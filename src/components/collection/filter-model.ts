import type { Product, ProductCategory, ProductPattern } from "@/data/products";

export type AvailabilityFilter = "in-stock" | "out-of-stock";

export type ProductFilters = {
  categories: ProductCategory[];
  collections: string[];
  colors: string[];
  sizes: string[];
  priceMin: number | null;
  priceMax: number | null;
  availability: AvailabilityFilter[];
  patterns: ProductPattern[];
};

export type FilterKey = "categories" | "collections" | "colors" | "sizes" | "availability" | "patterns";
export type IgnoredFilterKey = FilterKey | "price";

export const emptyProductFilters: ProductFilters = {
  categories: [],
  collections: [],
  colors: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  availability: [],
  patterns: [],
};

export const availabilityOrder: AvailabilityFilter[] = ["in-stock", "out-of-stock"];

export function matchesProductFilters(product: Product, filters: ProductFilters, ignoredKey?: IgnoredFilterKey) {
  return (
    (ignoredKey === "categories" || filters.categories.length === 0 || filters.categories.includes(product.category)) &&
    (ignoredKey === "collections" || filters.collections.length === 0 || filters.collections.includes(product.collection)) &&
    (ignoredKey === "colors" || filters.colors.length === 0 || filters.colors.includes(product.color)) &&
    (ignoredKey === "sizes" || filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size))) &&
    (ignoredKey === "price" ||
      (filters.priceMin === null || product.price >= filters.priceMin) &&
      (filters.priceMax === null || product.price <= filters.priceMax)) &&
    (ignoredKey === "availability" || filters.availability.length === 0 ||
      filters.availability.some(value => value === "in-stock" ? product.inStock : !product.inStock)) &&
    (ignoredKey === "patterns" || filters.patterns.length === 0 || filters.patterns.includes(product.pattern))
  );
}

export function countFilterOption(products: Product[], filters: ProductFilters, key: FilterKey, value: string) {
  return products.filter(product => {
    if (!matchesProductFilters(product, filters, key)) return false;
    if (key === "categories") return product.category === value;
    if (key === "collections") return product.collection === value;
    if (key === "colors") return product.color === value;
    if (key === "sizes") return product.sizes.includes(value);
    if (key === "availability") return value === "in-stock" ? product.inStock : !product.inStock;
    return product.pattern === value;
  }).length;
}