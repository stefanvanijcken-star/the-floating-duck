import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, CircleCheck, PackageCheck, Truck } from "lucide-react";
import { TrackingForm } from "@/components/forms/forms";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Track Your Order" };

export default function TrackOrderPage() {
  return <main className={styles.page}>
    <header className={styles.hero}><p>Customer care</p><h1>Track Your Order</h1><div>Enter the details from your order confirmation to see the latest status.</div></header>
    <section className={styles.trackingLayout}>
      <div className={styles.trackingCard}><h2>Order details</h2><p>Your order number starts with TFD and can be found in your confirmation email.</p><TrackingForm /></div>
      <div className={styles.journey}><h2>What happens next</h2>
        <ol><li><CircleCheck/><span><strong>Order confirmed</strong><small>We receive and check your order.</small></span></li><li><Box/><span><strong>Preparing</strong><small>Your pieces are picked and packed.</small></span></li><li><Truck/><span><strong>On its way</strong><small>You receive tracking by email.</small></span></li><li><PackageCheck/><span><strong>Delivered</strong><small>Your summer starts here.</small></span></li></ol>
        <Link href="/contact">NEED HELP? <ArrowRight size={17}/></Link>
      </div>
    </section>
  </main>;
}
