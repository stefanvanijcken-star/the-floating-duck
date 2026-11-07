"use client";

import { useCurrency } from "./currency-provider";

export function Price({ amount, className }: { amount: number; className?: string }) {
  const { formatPrice } = useCurrency();
  return <span className={className}>{formatPrice(amount)}</span>;
}

export function CurrencyLabel({ light = false }: { light?: boolean }) {
  const { selection } = useCurrency();
  return <span aria-label={"Currency: " + selection.code} data-light={light || undefined}>{selection.code}</span>;
}