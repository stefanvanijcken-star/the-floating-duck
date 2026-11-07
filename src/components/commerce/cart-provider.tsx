"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

type AddItemOptions = {
  size: string;
  color: string;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  ready: boolean;
  addItem: (product: Product, options: AddItemOptions) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
};

const storageKey = "floating-duck-cart";
const changeEvent = "floating-duck-cart-change";
const emptyCartSnapshot = "[]";
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return typeof item.slug === "string"
    && typeof item.size === "string"
    && typeof item.color === "string"
    && typeof item.quantity === "number"
    && Number.isInteger(item.quantity)
    && item.quantity > 0;
}

function parseCartSnapshot(snapshot: string) {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function subscribeToCart(callback: () => void) {
  const notify = () => callback();
  window.addEventListener("storage", notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(changeEvent, notify);
  };
}

function getCartSnapshot() {
  return window.localStorage.getItem(storageKey) ?? emptyCartSnapshot;
}

function subscribeToHydration() {
  return () => undefined;
}

function isSameVariant(left: CartItem, right: Pick<CartItem, "slug" | "size" | "color">) {
  return left.slug === right.slug && left.size === right.size && left.color === right.color;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => emptyCartSnapshot);
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const items = useMemo(() => parseCartSnapshot(snapshot), [snapshot]);

  const saveItems = useCallback((update: (current: CartItem[]) => CartItem[]) => {
    const current = parseCartSnapshot(getCartSnapshot());
    const next = update(current);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    ready,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem: (product, options) => saveItems(current => {
      const quantity = Math.max(1, options.quantity ?? 1);
      const existing = current.find(item => isSameVariant(item, { slug: product.slug, size: options.size, color: options.color }));
      if (!existing) return [...current, { slug: product.slug, size: options.size, color: options.color, quantity }];
      return current.map(item => isSameVariant(item, existing)
        ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
        : item);
    }),
    updateQuantity: (target, quantity) => saveItems(current => quantity < 1
      ? current.filter(item => !isSameVariant(item, target))
      : current.map(item => isSameVariant(item, target) ? { ...item, quantity: Math.min(99, quantity) } : item)),
    removeItem: target => saveItems(current => current.filter(item => !isSameVariant(item, target))),
    clearCart: () => saveItems(() => []),
  }), [items, ready, saveItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}