"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type CurrencyCode = "EUR" | "GBP" | "USD" | "CHF" | "SEK" | "NOK" | "DKK";

export type CurrencyOption = {
  code: CurrencyCode;
  name: string;
  locale: string;
  rate: number;
};

export const currencies: CurrencyOption[] = [
  { code: "EUR", name: "Euro", locale: "nl-NL", rate: 1 },
  { code: "GBP", name: "British Pound", locale: "en-GB", rate: 0.85098 },
  { code: "USD", name: "US Dollar", locale: "en-US", rate: 1.1435 },
  { code: "CHF", name: "Swiss Franc", locale: "de-CH", rate: 0.9228 },
  { code: "SEK", name: "Swedish Krona", locale: "sv-SE", rate: 11.0405 },
  { code: "NOK", name: "Norwegian Krone", locale: "nb-NO", rate: 11.039 },
  { code: "DKK", name: "Danish Krone", locale: "da-DK", rate: 7.4756 },
];

type CurrencyContextValue = {
  selection: CurrencyOption;
  selectCurrency: (currency: CurrencyCode) => void;
  formatPrice: (euroAmount: number) => string;
};

const defaultCurrency = currencies[0];
const storageKey = "floating-duck-currency-code";
const changeEvent = "floating-duck-currency-change";
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function subscribeToCurrency(callback: () => void) {
  const notify = () => callback();
  window.addEventListener("storage", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

function getCurrencySnapshot() {
  const storedCurrency = window.localStorage.getItem(storageKey);
  return currencies.some(option => option.code === storedCurrency)
    ? storedCurrency as CurrencyCode
    : defaultCurrency.code;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currencyCode = useSyncExternalStore(subscribeToCurrency, getCurrencySnapshot, () => defaultCurrency.code);
  const selection = currencies.find(option => option.code === currencyCode) ?? defaultCurrency;

  const value = useMemo<CurrencyContextValue>(() => ({
    selection,
    selectCurrency: (nextCurrency) => {
      if (!currencies.some(option => option.code === nextCurrency)) return;
      window.localStorage.setItem(storageKey, nextCurrency);
      window.dispatchEvent(new Event(changeEvent));
    },
    formatPrice: (euroAmount) => new Intl.NumberFormat(selection.locale, {
      style: "currency",
      currency: selection.code,
      maximumFractionDigits: ["SEK", "NOK", "DKK"].includes(selection.code) ? 0 : 2,
    }).format(euroAmount * selection.rate),
  }), [selection]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used inside CurrencyProvider");
  return context;
}