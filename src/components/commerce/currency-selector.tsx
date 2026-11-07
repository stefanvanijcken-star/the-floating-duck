"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { currencies, useCurrency } from "./currency-provider";
import styles from "./currency-selector.module.css";

export function CurrencySelector({ onOpen, mobile = false }: { onOpen?: () => void; mobile?: boolean }) {
  const { selection, selectCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) onOpen?.();
  };

  return <div className={styles.wrapper + (mobile ? " " + styles.mobile : "")} ref={wrapperRef}>
    <button className={styles.trigger} type="button" aria-expanded={open} aria-haspopup="menu" onClick={toggle}>
      <span>{selection.code}</span>
      <ChevronDown className={open ? styles.openChevron : ""} size={15} />
    </button>

    {open && <div className={styles.menu} role="menu" aria-label="Choose currency">
      <div className={styles.heading}>
        <strong>Currency</strong>
        <span>Choose the currency used for prices.</span>
      </div>
      <div className={styles.options}>
        {currencies.map(option => <button
          key={option.code}
          type="button"
          role="menuitemradio"
          aria-checked={selection.code === option.code}
          onClick={() => {
            selectCurrency(option.code);
            setOpen(false);
          }}
        >
          <strong>{option.code}</strong>
          <span>{option.name}</span>
          {selection.code === option.code && <Check size={18} />}
        </button>)}
      </div>
      <p className={styles.rateNote}>Reference rates updated 17 July 2026.</p>
    </div>}
  </div>;
}