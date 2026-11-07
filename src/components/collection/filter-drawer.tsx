"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useCurrency } from "@/components/commerce/currency-provider";
import {
  availabilityOrder,
  countFilterOption,
  type FilterKey,
  type ProductFilters,
} from "@/components/collection/filter-model";
import type { Product, ProductPattern } from "@/data/products";
import styles from "./filter-drawer.module.css";

type FilterDrawerProps = {
  products: Product[];
  filters: ProductFilters;
  onToggle: (key: FilterKey, value: string) => void;
  onPriceChange: (minimum: number | null, maximum: number | null) => void;
  onClear: () => void;
};

const patternOrder: ProductPattern[] = ["Solid", "Print", "Striped", "Dotted"];
const sizeOrder = ["XS", "S", "M", "L", "XL", "One Size"];
const colorOptions = [
  { name: "Navy", value: "#0e2340" },
  { name: "Pastel Green", value: "#d9e8d5" },
  { name: "Light Blue", value: "#bcd9f2" },
  { name: "Aqua", value: "#8fd8d3" },
  { name: "Ivory", value: "#eee5d7" },
  { name: "Green", value: "#8fa997" },
];

export function FilterDrawer({ products, filters, onToggle, onPriceChange, onClear }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const activeCount = filters.colors.length + filters.sizes.length + filters.availability.length +
    filters.patterns.length + (filters.priceMin !== null || filters.priceMax !== null ? 1 : 0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const itemsFor = (key: FilterKey, values: readonly string[]) =>
    values.map(value => ({ value, count: countFilterOption(products, filters, key, value) }));

  return <>
    <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
      {"FILTER" + (activeCount > 0 ? " (" + activeCount + ")" : "")}
    </button>
    {open && <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden />}
    <aside className={styles.drawer + " " + (open ? styles.open : "")} aria-hidden={!open} aria-label="Product filters">
      <div className={styles.title}>
        <h2>Filters</h2>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close filters"><X size={30} /></button>
      </div>

      <FilterGroup
        title="Color"
        items={colorOptions.map(color => ({
          value: color.name,
          count: countFilterOption(products, filters, "colors", color.name),
          swatch: color.value,
        }))}
        selected={filters.colors}
        onToggle={(value) => onToggle("colors", value)}
      />
      <FilterGroup
        title="Size"
        items={itemsFor("sizes", sizeOrder)}
        selected={filters.sizes}
        onToggle={(value) => onToggle("sizes", value)}
        layout="sizes"
      />
      <PriceFilter
        products={products}
        minimum={filters.priceMin}
        maximum={filters.priceMax}
        onChange={onPriceChange}
      />
      <FilterGroup
        title="Availability"
        items={itemsFor("availability", availabilityOrder).map(item => ({
          ...item,
          label: item.value === "in-stock" ? "In stock" : "Out of stock",
        }))}
        selected={filters.availability}
        onToggle={(value) => onToggle("availability", value)}
      />
      <FilterGroup
        title="Pattern"
        items={itemsFor("patterns", patternOrder)}
        selected={filters.patterns}
        onToggle={(value) => onToggle("patterns", value)}
      />

      <div className={styles.result}>
        {activeCount > 0 && <button className={styles.clear} type="button" onClick={onClear}>REMOVE ALL FILTERS</button>}
        <button className={styles.view} type="button" onClick={() => setOpen(false)}>VIEW RESULTS</button>
      </div>
    </aside>
  </>;
}

function PriceFilter({
  products,
  minimum,
  maximum,
  onChange,
}: {
  products: Product[];
  minimum: number | null;
  maximum: number | null;
  onChange: (minimum: number | null, maximum: number | null) => void;
}) {
  const [open, setOpen] = useState(true);
  const { selection } = useCurrency();
  const rangeMinimum = 0;
  const rangeMaximum = Math.max(5, Math.ceil(Math.max(...products.map(product => product.price)) / 5) * 5);
  const currentMinimum = minimum ?? rangeMinimum;
  const currentMaximum = maximum ?? rangeMaximum;
  const minimumPosition = currentMinimum / rangeMaximum * 100;
  const maximumPosition = currentMaximum / rangeMaximum * 100;
  const decimals = ["SEK", "NOK", "DKK"].includes(selection.code) ? 0 : 2;

  const normalize = (nextMinimum: number, nextMaximum: number) => {
    const safeMinimum = Math.min(Math.max(nextMinimum, rangeMinimum), nextMaximum);
    const safeMaximum = Math.max(Math.min(nextMaximum, rangeMaximum), safeMinimum);
    onChange(
      safeMinimum <= rangeMinimum ? null : Math.round(safeMinimum * 100) / 100,
      safeMaximum >= rangeMaximum ? null : Math.round(safeMaximum * 100) / 100,
    );
  };

  const fromDisplayCurrency = (value: number) => value / selection.rate;
  const toDisplayCurrency = (value: number) => Number((value * selection.rate).toFixed(decimals));

  return <section className={styles.group}>
    <button className={styles.groupTitle} type="button" onClick={() => setOpen(current => !current)} aria-expanded={open}>
      <strong>Price</strong>{open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {open && <div className={styles.priceFilter}>
      <div
        className={styles.rangeSliders}
        style={{
          "--range-start": minimumPosition + "%",
          "--range-end": maximumPosition + "%",
        } as CSSProperties}
      >
        <div className={styles.rangeRail} />
        <input
          className={styles.range}
          type="range"
          min={rangeMinimum}
          max={rangeMaximum}
          step="1"
          value={currentMinimum}
          aria-label="Minimum price"
          onChange={(event) => normalize(Number(event.target.value), currentMaximum)}
        />
        <input
          className={styles.range}
          type="range"
          min={rangeMinimum}
          max={rangeMaximum}
          step="1"
          value={currentMaximum}
          aria-label="Maximum price"
          onChange={(event) => normalize(currentMinimum, Number(event.target.value))}
        />
      </div>

      <div className={styles.priceInputs}>
        <label>
          <span>Minimum</span>
          <span className={styles.priceInput}>
            <small>{selection.code}</small>
            <input
              type="number"
              min={toDisplayCurrency(rangeMinimum)}
              max={toDisplayCurrency(currentMaximum)}
              step={decimals === 0 ? 1 : .01}
              value={toDisplayCurrency(currentMinimum)}
              onChange={(event) => {
                if (event.target.value === "") return onChange(null, maximum);
                normalize(fromDisplayCurrency(Number(event.target.value)), currentMaximum);
              }}
            />
          </span>
        </label>
        <label>
          <span>Maximum</span>
          <span className={styles.priceInput}>
            <small>{selection.code}</small>
            <input
              type="number"
              min={toDisplayCurrency(currentMinimum)}
              max={toDisplayCurrency(rangeMaximum)}
              step={decimals === 0 ? 1 : .01}
              value={toDisplayCurrency(currentMaximum)}
              onChange={(event) => {
                if (event.target.value === "") return onChange(minimum, null);
                normalize(currentMinimum, fromDisplayCurrency(Number(event.target.value)));
              }}
            />
          </span>
        </label>
      </div>
    </div>}
  </section>;
}

type FilterItem = { value: string; label?: string; count: number; swatch?: string };

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
  layout = "list",
}: {
  title: string;
  items: FilterItem[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  layout?: "list" | "sizes";
}) {
  const [open, setOpen] = useState(true);

  return <section className={styles.group}>
    <button className={styles.groupTitle} type="button" onClick={() => setOpen(current => !current)} aria-expanded={open}>
      <strong>{title}</strong>{open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {open && <div className={layout === "sizes" ? styles.sizes : styles.items}>
      {items.map(item => {
        const isSelected = selected.includes(item.value);
        return <button
          key={item.value}
          type="button"
          aria-pressed={isSelected}
          disabled={item.count === 0 && !isSelected}
          onClick={() => onToggle(item.value)}
        >
          {item.swatch && <span className={styles.swatch} style={{ background: item.swatch }} aria-hidden />}
          <span className={styles.itemLabel}>{item.label ?? item.value}</span>
          <span className={styles.itemCount}>({item.count})</span>
        </button>;
      })}
    </div>}
  </section>;
}