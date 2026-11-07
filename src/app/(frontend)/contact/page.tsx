import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, MessageCircle, PackageSearch } from "lucide-react";
import { ContactForm } from "@/components/forms/forms";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Contact", description: "Contact The Floating Duck customer care." };

export default function ContactPage() {
  return <main className={styles.page}>
    <header className={styles.hero}><p>Customer care</p><h1>How Can We Help?</h1><div>Send us a message and we’ll make sure it reaches the right person.</div></header>
    <div className={styles.contactLayout}>
      <section className={styles.contactIntro}>
        <h2>We’re here for you</h2>
        <p>Include your order number when your question is about an existing order. Please don’t send payment details through this form.</p>
        <div className={styles.contactCards}>
          <div><MessageCircle size={23}/><span><strong>Thoughtful support</strong><small>Clear, personal answers</small></span></div>
          <div><Clock3 size={23}/><span><strong>Response time</strong><small>Usually within 2 working days</small></span></div>
          <Link href="/track-order"><PackageSearch size={23}/><span><strong>Track an order</strong><small>Check the latest order status</small></span></Link>
        </div>
      </section>
      <ContactForm />
    </div>
  </main>;
}
