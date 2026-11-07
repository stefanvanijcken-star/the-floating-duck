import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";
import { getProducts } from "@/lib/cms-products";

export const metadata: Metadata = { title: "Your Cart" };
export const dynamic = "force-dynamic";

export default async function ShoppingCartPage() {
  return <CartPage products={await getProducts()} />;
}
