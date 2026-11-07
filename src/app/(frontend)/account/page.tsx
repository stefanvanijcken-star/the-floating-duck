import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Headphones, PackageSearch, ShieldCheck, ShoppingBag } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Account & Orders" };

export default function AccountPage() {
  return <main className={styles.page}>
    <header><p>Your Floating Duck</p><h1>Orders & Support</h1><div>You don’t need an account to shop. Use your order details whenever you need help.</div></header>
    <section className={styles.grid}>
      <Link href="/track-order"><PackageSearch/><span><strong>Track your order</strong><small>See the latest status with your order number and email.</small></span><ArrowRight/></Link>
      <Link href="/contact"><Headphones/><span><strong>Contact customer care</strong><small>Questions about fit, products, delivery or a return.</small></span><ArrowRight/></Link>
      <Link href="/returns"><ShieldCheck/><span><strong>Returns</strong><small>Read the return conditions and how to get started.</small></span><ArrowRight/></Link>
      <Link href="/collections/riviera-club"><ShoppingBag/><span><strong>Continue shopping</strong><small>Explore all swimwear and beach accessories.</small></span><ArrowRight/></Link>
    </section>
    <aside><h2>Why no password?</h2><p>Guest shopping is quicker and avoids creating an account you may only use once. When checkout is activated, every order will still be accessible securely with its order number and email address.</p></aside>
  </main>;
}
