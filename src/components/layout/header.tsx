"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/commerce/cart-provider";
import { CurrencySelector } from "@/components/commerce/currency-selector";
import styles from "./header.module.css";

type MenuSection = { title: string; links: { label: string; href: string }[] };
type FeatureCard = { label: string; eyebrow: string; image: string; href: string };
type NavItem = { label: string; href: string; sections: MenuSection[]; cards: FeatureCard[] };

const collectionHref = "/collections/riviera-club";
const shopLinks = {
  all: collectionHref,
  featured: `${collectionHref}?sort=featured`,
  priceLow: `${collectionHref}?sort=price-asc`,
  inStock: `${collectionHref}?availability=in-stock`,
  mens: `${collectionHref}?category=Swim%20Shorts`,
  mensStriped: `${collectionHref}?category=Swim%20Shorts&pattern=Striped`,
  mensPrinted: `${collectionHref}?category=Swim%20Shorts&pattern=Print`,
  womens: `${collectionHref}?category=Bikini%20Tops&category=Bikini%20Bottoms&category=Swimsuits`,
  womensInStock: `${collectionHref}?category=Bikini%20Tops&category=Bikini%20Bottoms&category=Swimsuits&availability=in-stock`,
  bikiniSeparates: `${collectionHref}?category=Bikini%20Tops&category=Bikini%20Bottoms`,
  bikiniTops: `${collectionHref}?category=Bikini%20Tops`,
  bikiniBottoms: `${collectionHref}?category=Bikini%20Bottoms`,
  swimsuits: `${collectionHref}?category=Swimsuits`,
  accessories: `${collectionHref}?category=Bathing%20Towels`,
  accessoriesInStock: `${collectionHref}?category=Bathing%20Towels&availability=in-stock`,
  accessoriesUnder20: `${collectionHref}?category=Bathing%20Towels&max=20`,
  cabana: `${collectionHref}?collection=Cabana%20Stripes`,
  cabanaMens: `${collectionHref}?category=Swim%20Shorts&collection=Cabana%20Stripes`,
  cabanaWomens: `${collectionHref}?category=Bikini%20Tops&category=Bikini%20Bottoms&category=Swimsuits&collection=Cabana%20Stripes`,
  poolTiles: `${collectionHref}?collection=Pool%20Tiles`,
  poolTilesWomens: `${collectionHref}?category=Bikini%20Tops&category=Bikini%20Bottoms&collection=Pool%20Tiles`,
  wavy: `${collectionHref}?collection=Wavy%20Stripes`,
  mini: `${collectionHref}?category=Swim%20Shorts&collection=Mini%20Stripes`,
  lemons: `${collectionHref}?category=Swim%20Shorts&collection=Lemons`,
  seaTurtles: `${collectionHref}?category=Swim%20Shorts&collection=Sea%20Turtles`,
  pastelGreenAccessories: `${collectionHref}?category=Bathing%20Towels&color=Pastel%20Green`,
};

const navItems: NavItem[] = [
  {
    label: "New",
    href: shopLinks.featured,
    sections: [
      { title: "Featured", links: [{ label: "Shop all", href: shopLinks.all }, { label: "Available now", href: shopLinks.inStock }, { label: "Price low to high", href: shopLinks.priceLow }] },
      { title: "Shop by type", links: [{ label: "Swim shorts", href: shopLinks.mens }, { label: "Bikini separates", href: shopLinks.bikiniSeparates }, { label: "Swimsuits", href: shopLinks.swimsuits }] },
      { title: "Collections", links: [{ label: "Cabana Stripes", href: shopLinks.cabana }, { label: "Pool Tiles", href: shopLinks.poolTiles }, { label: "Wavy Stripes", href: shopLinks.wavy }] },
    ],
    cards: [
      { eyebrow: "Signature collection", label: "Cabana Stripes", image: "/assets/images/home/riviera-club-hero.png", href: shopLinks.cabana },
      { eyebrow: "Shop the edit", label: "Riviera Club", image: "/assets/images/home/summer-collection-2026-banner.png", href: shopLinks.all },
    ],
  },
  {
    label: "Mens",
    href: shopLinks.mens,
    sections: [
      { title: "Swimwear", links: [{ label: "All swim shorts", href: shopLinks.mens }, { label: "Striped swim shorts", href: shopLinks.mensStriped }, { label: "Printed swim shorts", href: shopLinks.mensPrinted }, { label: "Shop all mens", href: shopLinks.mens }] },
      { title: "Featured", links: [{ label: "Available now", href: `${shopLinks.mens}&availability=in-stock` }, { label: "Cabana Stripes", href: shopLinks.cabanaMens }, { label: "Sea Turtles", href: shopLinks.seaTurtles }] },
      { title: "Collections", links: [{ label: "Cabana Stripes", href: shopLinks.cabanaMens }, { label: "Mini Stripes", href: shopLinks.mini }, { label: "Lemons", href: shopLinks.lemons }] },
    ],
    cards: [
      { eyebrow: "The Riviera edit", label: "Cabana Stripes", image: "/assets/images/products/cabana-stripes-swim-shorts-pastel-green-lifestyle.png", href: shopLinks.cabanaMens },
      { eyebrow: "Made for summer", label: "Shop Mens", image: "/assets/images/home/summer-collection-2026-banner.png", href: shopLinks.mens },
    ],
  },
  {
    label: "Womens",
    href: shopLinks.womens,
    sections: [
      { title: "Swimwear", links: [{ label: "Bikini tops", href: shopLinks.bikiniTops }, { label: "Bikini bottoms", href: shopLinks.bikiniBottoms }, { label: "Swimsuits", href: shopLinks.swimsuits }, { label: "Shop all womens", href: shopLinks.womens }] },
      { title: "Featured", links: [{ label: "Available now", href: shopLinks.womensInStock }, { label: "Bikini separates", href: shopLinks.bikiniSeparates }, { label: "Complete the look", href: shopLinks.cabanaWomens }] },
      { title: "Collections", links: [{ label: "Cabana Stripes", href: shopLinks.cabanaWomens }, { label: "Pool Tiles", href: shopLinks.poolTilesWomens }, { label: "Wavy Stripes", href: shopLinks.wavy }] },
    ],
    cards: [
      { eyebrow: "Riviera Club", label: "Shop the look", image: "/assets/images/home/shop-the-look-banner.png", href: shopLinks.womens },
      { eyebrow: "Matching separates", label: "Cabana Stripes", image: "/assets/images/products/cabana-stripes-bikini-top-light-blue.png", href: "/products/cabana-stripes-bikini-top-light-blue" },
    ],
  },
  {
    label: "Accessories",
    href: shopLinks.accessories,
    sections: [
      { title: "Beach essentials", links: [{ label: "Bathing towels", href: shopLinks.accessories }, { label: "Pastel green towels", href: shopLinks.pastelGreenAccessories }, { label: "Cabana Stripes towels", href: `${shopLinks.accessories}&collection=Cabana%20Stripes` }] },
      { title: "Featured", links: [{ label: "Available now", href: shopLinks.accessoriesInStock }, { label: "Accessories under EUR 20", href: shopLinks.accessoriesUnder20 }, { label: "Shop all accessories", href: shopLinks.accessories }] },
      { title: "Explore swimwear", links: [{ label: "Mens swimwear", href: shopLinks.mens }, { label: "Womens swimwear", href: shopLinks.womens }, { label: "View all products", href: shopLinks.all }] },
    ],
    cards: [
      { eyebrow: "Poolside essential", label: "Cabana Bathing Towel", image: "/assets/images/products/cabana-stripes-bathing-towel-pastel-green.png", href: "/products/cabana-stripes-bathing-towel-pastel-green" },
      { eyebrow: "Complete the look", label: "Cabana Stripes", image: "/assets/images/home/riviera-club-hero.png", href: shopLinks.cabana },
    ],
  },
];

export function Header() {
  const { itemCount } = useCart();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const activeItem = navItems.find(item => item.label === activeMenu);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 180);
  };

  const closeMenus = () => {
    cancelClose();
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <header
      className={styles.header}
      onMouseLeave={scheduleClose}
      onKeyDown={(event) => event.key === "Escape" && closeMenus()}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu(null); }}
    >
      <nav className={styles.navigation} aria-label="Main navigation">
        <div className={styles.links}>
          {navItems.map(item => <div className={styles.navItem} key={item.label} onMouseEnter={() => { cancelClose(); setActiveMenu(item.label); }}>
            <Link className={activeMenu === item.label ? styles.activeNavLink : styles.navLink} href={item.href} aria-expanded={activeMenu === item.label} aria-controls="mega-menu" onFocus={() => { cancelClose(); setActiveMenu(item.label); }} onClick={closeMenus}>{item.label}</Link>
          </div>)}
        </div>

        <button className={styles.mobileMenu} type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link className={styles.wordmark} href="/" aria-label="The Floating Duck home" onClick={closeMenus}>
          <Image src="/assets/brand/the-floating-duck-typemark.svg" alt="The Floating Duck" width={303} height={31} preload />
        </Link>

        <div className={styles.actions}>
          <CurrencySelector onOpen={() => { cancelClose(); setActiveMenu(null); }} />
          <Link href="/account" aria-label="Account" onClick={closeMenus}><UserRound size={24} strokeWidth={1.8} /></Link>
          <Link href="/search" aria-label="Search" onClick={closeMenus}><Search size={24} strokeWidth={1.8} /></Link>
          <Link className={styles.cartLink} href="/cart" aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`} onClick={closeMenus}>
            <ShoppingCart size={24} strokeWidth={1.8} />
            {itemCount > 0 && <span className={styles.cartBadge} aria-hidden>{itemCount > 99 ? "99+" : itemCount}</span>}
          </Link>
        </div>
      </nav>

      {activeItem && <>
        <div className={styles.backdrop} aria-hidden onMouseEnter={scheduleClose} onClick={() => setActiveMenu(null)} />
        <MegaMenu key={activeItem.label} item={activeItem} onNavigate={closeMenus} onEnter={cancelClose} onLeave={scheduleClose} />
      </>}

      {mobileOpen && <>
        <div className={styles.mobileBackdrop} aria-hidden onClick={closeMenus} />
        <div className={styles.mobilePanel}>
          {navItems.map(item => <section className={styles.mobileNavItem} key={item.label}>
            <div>
              <Link href={item.href} onClick={closeMenus}>{item.label}</Link>
              <button type="button" aria-label={`Toggle ${item.label} menu`} aria-expanded={mobileSection === item.label} onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}>
                {mobileSection === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {mobileSection === item.label && <div className={styles.mobileSubmenu}>
              {item.sections.map(section => <div key={section.title}><strong>{section.title}</strong>{section.links.map(link => <Link key={link.label} href={link.href} onClick={closeMenus}>{link.label}</Link>)}</div>)}
            </div>}
          </section>)}
          <div className={styles.mobileUtilities}>
            <Link href="/account" onClick={closeMenus}><UserRound size={20} strokeWidth={1.7} />Account</Link>
            <Link href="/search" onClick={closeMenus}><Search size={20} strokeWidth={1.7} />Search</Link>
            <CurrencySelector mobile />
          </div>
        </div>
      </>}
    </header>
  );
}

function MegaMenu({ item, onNavigate, onEnter, onLeave }: { item: NavItem; onNavigate: () => void; onEnter: () => void; onLeave: () => void }) {
  return <div className={styles.megaMenu} id="mega-menu" onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <div className={styles.menuSections}>
      {item.sections.map(section => <section key={section.title}>
        <h2>{section.title}</h2>
        {section.links.map(link => <Link key={link.label} href={link.href} onClick={onNavigate}>{link.label}</Link>)}
      </section>)}
    </div>
    <div className={styles.featureCards}>
      {item.cards.map(card => <Link className={styles.featureCard} key={card.label} href={card.href} onClick={onNavigate}>
        <Image src={card.image} alt="" fill sizes="260px" />
        <span><small>{card.eyebrow}</small><strong>{card.label}</strong></span>
      </Link>)}
    </div>
  </div>;
}
