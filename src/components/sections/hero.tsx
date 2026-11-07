import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";

type HeroProps = { image: string; eyebrow: string; title: string; height?: "large" | "medium"; buttons: { label: string; href: string }[]; };

export function Hero({ image, eyebrow, title, height = "medium", buttons }: HeroProps) {
  return <section className={`${styles.hero} ${styles[height]}`}><Image src={image} alt="" fill preload={height === "large"} sizes="100vw" /><div className={styles.overlay} /><div className={styles.content}><p>{eyebrow}</p><h1>{title}</h1><div className={styles.buttons}>{buttons.map(button => <Link key={button.label} href={button.href}>{button.label}</Link>)}</div></div></section>;
}

