"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Clock3, Info, Leaf, PackageOpen, WashingMachine } from "lucide-react";
import { useCart } from "@/components/commerce/cart-provider";
import { useCurrency } from "@/components/commerce/currency-provider";
import { getProductColorVariants, getProductTitle, getVariantStock, productColorValues, type Product } from "@/data/products";
import styles from "./product-purchase.module.css";

function productInformation(product: Product, freeShipping: string) {
  const isTowel = product.category === "Bathing Towels";
  const isSwimShorts = product.category === "Swim Shorts";

  return [
    {
      label: "More info",
      icon: Info,
      content: isTowel
        ? [...(product.description ? [product.description] : []), "Generously sized for the beach, pool or boat.", "Soft terry texture with a woven stripe design.", "Finished with a practical hanging loop."]
        : isSwimShorts
          ? [...(product.description ? [product.description] : []), "Regular fit with a comfortable mid-thigh length.", "Elastic waistband with an adjustable drawcord and practical side pockets.", "Quick-drying mesh lining for comfort in and out of the water."]
          : [...(product.description ? [product.description] : []), "Comfortable stretch fit designed for swimming and relaxing poolside.", "Fully lined for a smooth feel and reliable coverage.", "Soft edges and carefully placed seams for lasting comfort."],
    },
    {
      label: "Materials",
      icon: Leaf,
      content: isTowel
        ? ["100% responsibly sourced cotton.", "Soft 450 GSM terry fabric.", "Made with OEKO-TEX Standard 100 certified materials."]
        : isSwimShorts
          ? ["Outer: 100% recycled polyester. Lining: 100% polyester.", "Made with OEKO-TEX Standard 100 certified fabric.", "Colours may vary slightly between production batches."]
          : ["82% recycled polyamide and 18% elastane.", "Lining: 90% recycled polyamide and 10% elastane.", "Made with OEKO-TEX Standard 100 certified fabric."],
    },
    {
      label: "Washing instructions",
      icon: WashingMachine,
      content: isTowel
        ? ["Machine wash at 40 degrees with similar colours.", "Tumble dry on a low setting.", "Do not bleach or dry clean."]
        : ["Rinse with cold water after swimming in salt water or chlorine.", "Machine wash at 30 degrees on a gentle cycle with similar colours.", "Do not bleach, tumble dry, iron or dry clean. Dry in the shade."],
    },
    {
      label: "Delivery & returns",
      icon: PackageOpen,
      content: [
        `Netherlands: delivery in 1-2 working days. Free shipping from ${freeShipping}.`,
        "Belgium and Germany: 2-4 working days. Other EU countries: 3-6 working days.",
        "Returns are accepted within 30 days when items are unused and have their original tags and hygiene seal attached.",
      ],
    },
  ];
}

export function ProductPurchase({ product, products }: { product: Product; products: Product[] }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const availableSizes = product.sizes.filter(value => getVariantStock(product, value) > 0);
  const defaultSize = availableSizes.includes("M") ? "M" : availableSizes[0] ?? product.sizes[0];
  const [size, setSize] = useState(defaultSize);
  const [added, setAdded] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const colorVariants = getProductColorVariants(product, products);
  const details = productInformation(product, formatPrice(75));
  const stockCount = getVariantStock(product, size);

  const addSelectedProduct = () => {
    if (stockCount < 1) return;
    addItem(product, { size, color: product.color });
  };

  const handleAddToCart = () => {
    addSelectedProduct();
    setAdded(true);
  };

  const handleBuyNow = () => {
    addSelectedProduct();
    if (stockCount > 0) router.push("/cart");
  };

  const selectColor = (variant: Product) => {
    setAdded(false);
    if (variant.slug !== product.slug) router.push(`/products/${variant.slug}`);
  };

  return <div className={styles.purchase}>
    <div className={styles.configuration}>
      <div className={styles.intro}>
        <h1>{getProductTitle(product)}</h1>
        <div className={styles.pricing}>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.tax}>Tax included. <u>Shipping</u> calculated at checkout.</p>
        </div>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <div className={styles.label}><span>Size</span><Link href="/size-guide">Size guide</Link></div>
          <div className={styles.sizes}>{product.sizes.map(value => { const available = getVariantStock(product, value) > 0; return <button type="button" disabled={!available} aria-label={available ? `Size ${value}` : `Size ${value}, out of stock`} aria-pressed={size === value} onClick={() => { setSize(value); setAdded(false); }} key={value}>{value}</button>; })}</div>
        </div>
        <div className={styles.option}>
          <span>Color: {product.color}</span>
          <div className={styles.colors}>{colorVariants.map(variant => <button
            type="button"
            key={variant.slug}
            onClick={() => selectColor(variant)}
            style={{ background: productColorValues[variant.color] ?? "#c5c9ca" }}
            aria-label={variant.color}
            aria-pressed={product.slug === variant.slug}
          />)}</div>
        </div>
      </div>
    </div>

    <div className={styles.checkout}>
      <div className={styles.buy}>
        <button type="button" onClick={handleAddToCart} disabled={stockCount < 1}>{stockCount > 0 ? (added ? "ADDED TO CART" : "ADD TO CART") : "OUT OF STOCK"}</button>
        <button type="button" onClick={handleBuyNow} disabled={stockCount < 1}>BUY IT NOW</button>
      </div>
      <p className={styles.stock}><Clock3 size={20} />{stockCount > 0 ? `Only ${stockCount} left in this size. Order soon.` : "This size is currently out of stock."}</p>
    </div>

    <div className={styles.details}>{details.map(({ label, icon: Icon, content }) => {
      const expanded = openDetail === label;
      return <section className={styles.detail} key={label}>
        <button type="button" aria-expanded={expanded} onClick={() => setOpenDetail(expanded ? null : label)}>
          <span><Icon size={20} />{label}</span>{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded && <div className={styles.detailContent}><ul>{content.map(line => <li key={line}>{line}</li>)}</ul></div>}
      </section>;
    })}</div>
  </div>;
}