"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Minus, Plus, RefreshCcw, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/commerce/cart-provider";
import { useCurrency } from "@/components/commerce/currency-provider";
import { getVariantStock, type Product } from "@/data/products";
import styles from "./cart-page.module.css";

const freeShippingThreshold = 75;

export function CartPage({ products }: { products: Product[] }) {
  const { items, ready, updateQuantity, removeItem, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const lines = items.flatMap(item => {
    const product = products.find(candidate => candidate.slug === item.slug);
    return product ? [{ item, product }] : [];
  });
  const subtotal = lines.reduce((total, line) => total + line.product.price * line.item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!ready) {
    return <section className={styles.loading} aria-label="Loading shopping cart">
      <span />
      <span />
    </section>;
  }

  if (lines.length === 0) {
    return <section className={styles.empty}>
      <ShoppingBag size={42} strokeWidth={1.35} />
      <h1>Your Cart</h1>
      <p>Your cart is currently empty. Discover the Riviera Club collection and find your new summer favourite.</p>
      <Link href="/collections/riviera-club">CONTINUE SHOPPING <ArrowRight size={17} /></Link>
    </section>;
  }

  return <div className={styles.page}>
    <header className={styles.heading}>
      <div>
        <p>Shopping bag</p>
        <h1>Your Cart</h1>
      </div>
      <button type="button" onClick={clearCart}>Remove all</button>
    </header>

    <div className={styles.layout}>
      <section className={styles.items} aria-label="Products in your cart">
        {lines.map(({ item, product }) => <article className={styles.item} key={`${item.slug}-${item.size}-${item.color}`}>
          <Link className={styles.image} href={`/products/${product.slug}`}>
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 34vw, 180px" />
          </Link>

          <div className={styles.itemBody}>
            <div className={styles.itemTop}>
              <div>
                <Link className={styles.productName} href={`/products/${product.slug}`}>{product.name.split(" | ")[0]}</Link>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
              </div>
              <strong>{formatPrice(product.price * item.quantity)}</strong>
            </div>

            <div className={styles.itemBottom}>
              <div className={styles.quantity} aria-label={`Quantity for ${product.name}`}>
                <button type="button" onClick={() => updateQuantity(item, item.quantity - 1)} aria-label={`Decrease quantity of ${product.name}`}><Minus size={15} /></button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" disabled={item.quantity >= getVariantStock(product, item.size)} onClick={() => updateQuantity(item, Math.min(item.quantity + 1, getVariantStock(product, item.size)))} aria-label={`Increase quantity of ${product.name}`}><Plus size={15} /></button>
              </div>
              <button className={styles.remove} type="button" onClick={() => removeItem(item)}><Trash2 size={16} />Remove</button>
            </div>
          </div>
        </article>)}

        <Link className={styles.continue} href="/collections/riviera-club"><ArrowRight size={17} />Continue shopping</Link>
      </section>

      <aside className={styles.summary}>
        <h2>Order Summary</h2>

        <div className={styles.shippingMessage}>
          <p>{remainingForFreeShipping > 0
            ? <>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> for free shipping</>
            : <strong>You have unlocked free shipping</strong>}
          </p>
          <div className={styles.progress} aria-hidden><span style={{ width: `${shippingProgress}%` }} /></div>
        </div>

        <dl className={styles.totals}>
          <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div><dt>Shipping</dt><dd>{remainingForFreeShipping === 0 ? "Free" : "Calculated at checkout"}</dd></div>
          <div className={styles.total}><dt>Total</dt><dd>{formatPrice(subtotal)}</dd></div>
        </dl>
        <p className={styles.tax}>Tax included. Shipping is calculated at checkout.</p>

        <button className={styles.checkout} type="button" onClick={() => setCheckoutMessage(true)}>CHECKOUT <ArrowRight size={18} /></button>
        {checkoutMessage && <p className={styles.checkoutMessage} role="status">Checkout will be connected when the payment provider is added.</p>}

        <div className={styles.benefits}>
          <p><Truck size={19} />Free shipping from {formatPrice(freeShippingThreshold)}</p>
          <p><RefreshCcw size={19} />30 day returns</p>
          <p><LockKeyhole size={19} />Secure checkout</p>
        </div>
      </aside>
    </div>
  </div>;
}
