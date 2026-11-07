"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { useCurrency } from "@/components/commerce/currency-provider";
import { FilterDrawer } from "@/components/collection/filter-drawer";
import {
  emptyProductFilters,
  matchesProductFilters,
  type FilterKey,
  type ProductFilters,
} from "@/components/collection/filter-model";
import { ProductCard } from "@/components/product/product-card";
import type { Product, ProductCategory } from "@/data/products";
import styles from "./collection-grid.module.css";

type GridColumns = 3 | 4;
type SortKey = "featured" | "price-asc" | "price-desc" | "collection";

const sortOptions: { value: SortKey; label: string; shortLabel: string }[] = [
  { value: "featured", label: "Featured", shortLabel: "Featured" },
  { value: "price-asc", label: "Price, Low to High", shortLabel: "Price low-high" },
  { value: "price-desc", label: "Price, High to Low", shortLabel: "Price high-low" },
  { value: "collection", label: "Collection", shortLabel: "Collection" },
];
const categoryOrder: ProductCategory[] = ["Swim Shorts", "Bikini Tops", "Bikini Bottoms", "Swimsuits", "Bathing Towels", "Caps", "Socks"];

export function CollectionGrid({
  products,
  initialFilters = emptyProductFilters,
  initialSort = "featured",
}: {
  products: Product[];
  initialFilters?: ProductFilters;
  initialSort?: SortKey;
}) {
  const [columns, setColumns] = useState<GridColumns>(4);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const sortRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) setSortOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSortOpen(false);
    document.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(product => matchesProductFilters(product, filters));
    if (sort === "featured") return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)) || (a.sortOrder ?? 100) - (b.sortOrder ?? 100));

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.collection.localeCompare(b.collection) ||
        a.color.localeCompare(b.color) ||
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
        a.name.localeCompare(b.name);
    });
  }, [filters, products, sort]);

  const toggleFilter = (key: FilterKey, value: string) => {
    setFilters(current => {
      const values = current[key] as string[];
      return {
        ...current,
        [key]: values.includes(value) ? values.filter(item => item !== value) : [...values, value],
      } as ProductFilters;
    });
  };

  const selectCategory = (category?: ProductCategory) => {
    setFilters(current => ({ ...current, categories: category ? [category] : [] }));
  };

  const setPriceRange = (priceMin: number | null, priceMax: number | null) => {
    setFilters(current => ({ ...current, priceMin, priceMax }));
  };

  const filterEntries: [FilterKey, string[]][] = [
    ["categories", filters.categories],
    ["collections", filters.collections],
    ["colors", filters.colors],
    ["sizes", filters.sizes],
    ["availability", filters.availability],
    ["patterns", filters.patterns],
  ];
  const activeFilters = filterEntries.flatMap(([key, values]) => values.map(value => ({ key, value })));
  const hasPriceFilter = filters.priceMin !== null || filters.priceMax !== null;
  const hasActiveFilters = activeFilters.length > 0 || hasPriceFilter;
  const selectedSort = sortOptions.find(option => option.value === sort) ?? sortOptions[0];
  const selectedCategories = filters.categories;
  const availableCategories = categoryOrder.filter(category => products.some(product => product.category === category));

  const filterLabel = (key: FilterKey, value: string) => {
    if (key === "availability") return value === "in-stock" ? "In stock" : "Out of stock";
    return value;
  };

  const priceLabel = filters.priceMin !== null && filters.priceMax !== null
    ? formatPrice(filters.priceMin) + " - " + formatPrice(filters.priceMax)
    : filters.priceMin !== null
      ? "From " + formatPrice(filters.priceMin)
      : "Up to " + formatPrice(filters.priceMax ?? 0);

  return <>
    <div className={styles.toolbar}>
      <div className={styles.gridControls} aria-label="Products per row">
        <button type="button" aria-label="Show 3 products per row" aria-pressed={columns === 3} onClick={() => setColumns(3)}><GridIcon columns={3} /></button>
        <button type="button" aria-label="Show 4 products per row" aria-pressed={columns === 4} onClick={() => setColumns(4)}><GridIcon columns={4} /></button>
      </div>

      <span className={styles.productCount}>{visibleProducts.length} PRODUCTS</span>

      <div className={styles.actions}>
        <div className={styles.sortWrap} ref={sortRef}>
          <button className={styles.sort} type="button" aria-expanded={sortOpen} aria-haspopup="listbox" onClick={() => setSortOpen(!sortOpen)}>
            <span>SORT BY: {selectedSort.shortLabel}</span><ChevronDown className={sortOpen ? styles.chevronOpen : ""} size={18} strokeWidth={1.5} />
          </button>
          {sortOpen && <div className={styles.sortMenu} role="listbox" aria-label="Sort products">
            {sortOptions.map(option => <button key={option.value} type="button" role="option" aria-selected={sort === option.value} onClick={() => { setSort(option.value); setSortOpen(false); }}>
              <span>{option.label}</span>{sort === option.value && <Check size={18} />}
            </button>)}
          </div>}
        </div>
        <FilterDrawer
          products={products}
          filters={filters}
          onToggle={toggleFilter}
          onPriceChange={setPriceRange}
          onClear={() => setFilters(emptyProductFilters)}
        />
      </div>
    </div>

    {hasActiveFilters && <div className={styles.activeFilters} aria-label="Active filters">
      <span className={styles.filteredBy}>FILTERED BY</span>
      <div className={styles.chips}>
        {activeFilters.map(filter => <button key={filter.key + "-" + filter.value} type="button" onClick={() => toggleFilter(filter.key, filter.value)}>
          {filterLabel(filter.key, filter.value)}<X size={15} />
        </button>)}
        {hasPriceFilter && <button type="button" onClick={() => setPriceRange(null, null)}>
          {priceLabel}<X size={15} />
        </button>}
      </div>
      <button className={styles.removeAll} type="button" onClick={() => setFilters(emptyProductFilters)}>REMOVE ALL FILTERS</button>
    </div>}

    <div className={styles.catalogLayout}>
      <aside className={styles.categorySidebar} aria-label="Product categories">
        <div className={styles.categorySidebarInner}>
          <CategoryNavigation categories={availableCategories} selected={selectedCategories} onSelect={selectCategory} />
        </div>
      </aside>

      <div className={styles.catalogResults}>
        <div className={styles.mobileCategories}>
          <CategoryNavigation categories={availableCategories} selected={selectedCategories} onSelect={selectCategory} compact />
        </div>

        {visibleProducts.length > 0
          ? <section className={styles.grid + " " + (columns === 4 ? styles.fourColumns : styles.threeColumns)}>
              {visibleProducts.map((product, index) => <ProductCard key={product.slug} product={product} eager={index < columns} />)}
            </section>
          : <div className={styles.empty}>
              <h2>No products found</h2>
              <p>Try removing one or more filters.</p>
              <button type="button" onClick={() => setFilters(emptyProductFilters)}>REMOVE ALL FILTERS</button>
            </div>}
      </div>
    </div>
  </>;
}

function CategoryNavigation({
  categories,
  selected,
  onSelect,
  compact = false,
}: {
  categories: ProductCategory[];
  selected: ProductCategory[];
  onSelect: (category?: ProductCategory) => void;
  compact?: boolean;
}) {
  const options: { label: string; value?: ProductCategory }[] = [
    { label: "All Products" },
    ...categories.map(value => ({ label: value, value })),
  ];

  return <nav className={compact ? styles.categoryChips : styles.categoryList}>
    {options.map(option => {
      const active = option.value ? selected.length === 1 && selected[0] === option.value : selected.length === 0;
      return <button
        key={option.label}
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect(option.value)}
      >
        {option.label}
      </button>;
    })}
  </nav>;
}

function GridIcon({ columns }: { columns: GridColumns }) {
  return <span className={styles.gridIcon} aria-hidden>
    {Array.from({ length: columns }, (_, index) => <span key={index} />)}
  </span>;
}