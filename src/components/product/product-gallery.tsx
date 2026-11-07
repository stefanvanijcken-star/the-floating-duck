"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./product-gallery.module.css";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomed(false);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightboxOpen]);

  return <>
    <div className={`${styles.gallery} ${images.length === 1 ? styles.single : ""}`.trim()}>
      <div className={styles.thumbnails} aria-label="Product images">
        {images.map((image, index) => <button
          key={image}
          type="button"
          className={selectedIndex === index ? styles.selected : ""}
          aria-label={`Show ${productName} image ${index + 1}`}
          aria-pressed={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          onFocus={() => setSelectedIndex(index)}
        >
          <Image src={image} alt="" fill sizes="120px" />
        </button>)}
      </div>
      <button className={styles.mainImage} type="button" onClick={() => setLightboxOpen(true)} aria-label={`Enlarge ${productName} image`}>
        <Image src={images[selectedIndex]} alt={`${productName}, view ${selectedIndex + 1}`} fill preload sizes="(max-width: 1100px) 80vw, 45vw" />
      </button>
    </div>

    {lightboxOpen && <div className={`${styles.lightbox} ${zoomed ? styles.lightboxZoomed : ""}`} role="dialog" aria-modal="true" aria-label={`Enlarged ${productName} image`} onClick={closeLightbox}>
      <button className={styles.close} type="button" onClick={closeLightbox} aria-label="Close enlarged image"><X size={36} strokeWidth={1.5} /></button>
      <button className={`${styles.lightboxImage} ${zoomed ? styles.zoomed : ""}`} type="button" onClick={(event) => { event.stopPropagation(); setZoomed(!zoomed); }} aria-label={zoomed ? "Zoom out image" : "Zoom in image"}>
        <Image src={images[selectedIndex]} alt={`${productName}, enlarged view ${selectedIndex + 1}`} fill sizes={zoomed ? "100vw" : "90vw"} />
      </button>
    </div>}
  </>;
}
