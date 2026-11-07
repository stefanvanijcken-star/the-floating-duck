import type { Metadata } from "next";
import { SearchPage } from "@/components/search/search-page";
import { getProducts } from "@/lib/cms-products";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default async function SearchRoute({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const query = (await searchParams).q;
  return <SearchPage products={await getProducts()} initialQuery={Array.isArray(query) ? query[0] ?? "" : query ?? ""} />;
}
