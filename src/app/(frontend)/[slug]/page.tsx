import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { contentPages } from "@/data/content-pages";
import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(contentPages).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = contentPages[(await params).slug];
  return { title: page?.title ?? "Page not found", description: page?.intro };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = contentPages[(await params).slug];
  if (!page) notFound();

  return <main className={styles.page}>
    <header className={styles.hero}>
      <p>{page.eyebrow}</p><h1>{page.title}</h1><div>{page.intro}</div>{page.updated && <small>{page.updated}</small>}
    </header>
    <div className={styles.layout}>
      <nav className={styles.sideNav} aria-label="On this page">
        <strong>On this page</strong>
        {page.sections.map(section => <a key={section.heading} href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{section.heading}</a>)}
      </nav>
      <article className={styles.article}>
        {page.sections.map(section => <section id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
        <aside className={styles.help}><div><strong>Still have a question?</strong><p>Our customer care page is the quickest way to reach us.</p></div><Link href="/contact">CONTACT US <ArrowRight size={17} /></Link></aside>
      </article>
    </div>
  </main>;
}
