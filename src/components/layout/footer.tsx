import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/forms";
import { CurrencyLabel } from "@/components/commerce/price";
import styles from "./footer.module.css";

const columns = [
  { title: "About Us", links: [{ label: "Contact", href: "/contact" }, { label: "Our Story", href: "/our-story" }, { label: "Sustainability", href: "/sustainability" }] },
  { title: "Get Help", links: [{ label: "FAQ", href: "/faq" }, { label: "Shipping & Delivery", href: "/shipping-delivery" }, { label: "Returns", href: "/returns" }, { label: "Size Guide", href: "/size-guide" }, { label: "Track Your Order", href: "/track-order" }] },
  { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms & Conditions", href: "/terms-conditions" }, { label: "Cookie Policy", href: "/cookie-policy" }, { label: "Refund Policy", href: "/refund-policy" }] },
  { title: "Discover", links: [{ label: "New arrivals", href: "/collections/riviera-club?sort=featured" }, { label: "Mens", href: "/collections/riviera-club?category=Swim%20Shorts" }, { label: "Womens", href: "/collections/riviera-club?category=Bikini%20Tops&category=Bikini%20Bottoms&category=Swimsuits" }, { label: "Accessories", href: "/collections/riviera-club?category=Bathing%20Towels" }] },
];

export function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.top}>
      <div className={styles.newsletter}>
        <Image src="/assets/brand/the-floating-duck-symbol-outlined.svg" alt="The Floating Duck mascot" width={109} height={80} />
        <div><h2>Newsletter</h2><p>Sign up to our newsletter to receive exclusive offers.</p></div>
        <NewsletterForm />
      </div>
      <div className={styles.columns}>
        {columns.map(column => <section key={column.title}><h2>{column.title}</h2>{column.links.map(link => <Link key={link.label} href={link.href}>{link.label}</Link>)}</section>)}
      </div>
    </div>
    <div className={styles.bottom}><span className={styles.currency}><CurrencyLabel light /></span><p>© 2026 The Floating Duck™</p><span /></div>
  </footer>;
}
