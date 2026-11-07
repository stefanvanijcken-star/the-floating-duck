export type ProductCategory = "Swim Shorts" | "Bikini Tops" | "Bikini Bottoms" | "Swimsuits" | "Bathing Towels" | "Caps" | "Socks";
export type ProductPattern = "Solid" | "Print" | "Striped" | "Dotted";

export type ProductVariant = {
  size: string;
  sku: string;
  stock: number;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  color: string;
  pattern: ProductPattern;
  collection: string;
  sizes: string[];
  inStock: boolean;
  stockCount?: number;
  gallery?: string[];
  hoverImage?: string;
  audience?: "men" | "women" | "unisex";
  description?: string;
  variants?: ProductVariant[];
  pairedProductSlug?: string;
  featured?: boolean;
  bestSeller?: boolean;
  sortOrder?: number;
};

const clothingSizes = ["XS", "S", "M", "L", "XL"];
const swimShortSizes = ["S", "M", "L", "XL"];

export const products: Product[] = [
  { slug: "cabana-stripes-swim-shorts-navy", name: "Cabana Stripes Swim Shorts | Navy", price: 35, image: "/assets/images/products/cabana-stripes-swim-shorts-navy.png", category: "Swim Shorts", color: "Navy", pattern: "Striped", collection: "Cabana Stripes", inStock: true, sizes: swimShortSizes, hoverImage: "/assets/images/products/cabana-stripes-swim-shorts-navy-hover.png", gallery: ["/assets/images/products/cabana-stripes-swim-shorts-navy.png", "/assets/images/products/cabana-stripes-swim-shorts-navy-back.png", "/assets/images/products/cabana-stripes-swim-shorts-navy-hover.png"] },
  { slug: "cabana-stripes-swim-shorts-pastel-green", name: "Cabana Stripes Swim Shorts | Pastel Green", price: 35, image: "/assets/images/products/cabana-stripes-swim-shorts-pastel-green.png", category: "Swim Shorts", color: "Pastel Green", pattern: "Striped", collection: "Cabana Stripes", inStock: true, stockCount: 6, sizes: swimShortSizes, hoverImage: "/assets/images/products/cabana-stripes-swim-shorts-pastel-green-lifestyle.png", gallery: ["/assets/images/products/cabana-stripes-swim-shorts-pastel-green-front.png", "/assets/images/products/cabana-stripes-swim-shorts-pastel-green-back.png", "/assets/images/products/cabana-stripes-swim-shorts-pastel-green-lifestyle.png"] },
  { slug: "cabana-stripes-bikini-top-light-blue", name: "Cabana Stripes Bikini Top | Light Blue", price: 20, image: "/assets/images/products/cabana-stripes-bikini-top-light-blue.png", category: "Bikini Tops", color: "Light Blue", pattern: "Striped", collection: "Cabana Stripes", inStock: false, sizes: clothingSizes, hoverImage: "/assets/images/products/cabana-stripes-bikini-light-blue-lifestyle.png", gallery: ["/assets/images/products/cabana-stripes-bikini-top-light-blue.png", "/assets/images/products/cabana-stripes-bikini-top-light-blue-back.png", "/assets/images/products/cabana-stripes-bikini-light-blue-lifestyle.png"] },
  { slug: "cabana-stripes-bikini-bottom-light-blue", name: "Cabana Stripes Bikini Bottom | Light Blue", price: 12, image: "/assets/images/products/cabana-stripes-bikini-bottom-light-blue.png", category: "Bikini Bottoms", color: "Light Blue", pattern: "Striped", collection: "Cabana Stripes", inStock: true, sizes: clothingSizes, hoverImage: "/assets/images/products/cabana-stripes-bikini-light-blue-lifestyle.png", gallery: ["/assets/images/products/cabana-stripes-bikini-bottom-light-blue.png", "/assets/images/products/cabana-stripes-bikini-bottom-light-blue-back.png", "/assets/images/products/cabana-stripes-bikini-light-blue-lifestyle.png"] },
  { slug: "wavy-stripes-swimsuit-aqua", name: "Wavy Stripes Swim Suit | Aqua", price: 32, image: "/assets/images/products/wavy-stripes-swimsuit-aqua.png", category: "Swimsuits", color: "Aqua", pattern: "Print", collection: "Wavy Stripes", inStock: true, sizes: clothingSizes, hoverImage: "/assets/images/products/wavy-stripes-swimsuit-aqua-lifestyle.png", gallery: ["/assets/images/products/wavy-stripes-swimsuit-aqua.png", "/assets/images/products/wavy-stripes-swimsuit-aqua-back.png", "/assets/images/products/wavy-stripes-swimsuit-aqua-lifestyle.png"] },
  { slug: "mini-stripes-swim-shorts-aqua", name: "Mini Stripes Swim Shorts | Aqua", price: 35, image: "/assets/images/products/mini-stripes-swim-shorts-aqua.png", category: "Swim Shorts", color: "Aqua", pattern: "Striped", collection: "Mini Stripes", inStock: true, sizes: swimShortSizes, hoverImage: "/assets/images/products/mini-stripes-swim-shorts-aqua-lifestyle.png", gallery: ["/assets/images/products/mini-stripes-swim-shorts-aqua.png", "/assets/images/products/mini-stripes-swim-shorts-aqua-back.png", "/assets/images/products/mini-stripes-swim-shorts-aqua-lifestyle.png"] },
  { slug: "cabana-stripes-swim-shorts-light-blue", name: "Cabana Stripes Swim Shorts | Light Blue", price: 35, image: "/assets/images/products/cabana-stripes-swim-shorts-light-blue.png", category: "Swim Shorts", color: "Light Blue", pattern: "Striped", collection: "Cabana Stripes", inStock: true, sizes: swimShortSizes, hoverImage: "/assets/images/products/cabana-stripes-swim-shorts-light-blue-hover.png", gallery: ["/assets/images/products/cabana-stripes-swim-shorts-light-blue.png", "/assets/images/products/cabana-stripes-swim-shorts-light-blue-back.png", "/assets/images/products/cabana-stripes-swim-shorts-light-blue-hover.png"] },
  { slug: "pool-tiles-bikini-top-navy", name: "Pool Tiles Bikini Top | Navy", price: 20, image: "/assets/images/products/pool-tiles-bikini-top-navy.png", category: "Bikini Tops", color: "Navy", pattern: "Print", collection: "Pool Tiles", inStock: true, sizes: clothingSizes, hoverImage: "/assets/images/products/pool-tiles-bikini-navy-lifestyle.png", gallery: ["/assets/images/products/pool-tiles-bikini-top-navy.png", "/assets/images/products/pool-tiles-bikini-top-navy-back.png", "/assets/images/products/pool-tiles-bikini-navy-lifestyle.png"] },
  { slug: "pool-tiles-bikini-bottom-navy", name: "Pool Tiles Bikini Bottom | Navy", price: 12, image: "/assets/images/products/pool-tiles-bikini-bottom-navy.png", category: "Bikini Bottoms", color: "Navy", pattern: "Print", collection: "Pool Tiles", inStock: false, sizes: clothingSizes, hoverImage: "/assets/images/products/pool-tiles-bikini-navy-lifestyle.png", gallery: ["/assets/images/products/pool-tiles-bikini-bottom-navy.png", "/assets/images/products/pool-tiles-bikini-bottom-navy-back.png", "/assets/images/products/pool-tiles-bikini-navy-lifestyle.png"] },
  { slug: "lemons-swim-shorts-ivory", name: "Lemons Swim Shorts | Ivory", price: 35, image: "/assets/images/products/lemons-swim-shorts-ivory.png", category: "Swim Shorts", color: "Ivory", pattern: "Dotted", collection: "Lemons", inStock: true, sizes: swimShortSizes, hoverImage: "/assets/images/products/lemons-swim-shorts-ivory-lifestyle.png", gallery: ["/assets/images/products/lemons-swim-shorts-ivory.png", "/assets/images/products/lemons-swim-shorts-ivory-back.png", "/assets/images/products/lemons-swim-shorts-ivory-lifestyle.png"] },
  { slug: "sea-turtles-swim-shorts-green", name: "Sea Turtles Swim Shorts | Green", price: 35, image: "/assets/images/products/sea-turtles-swim-shorts-green.png", category: "Swim Shorts", color: "Green", pattern: "Print", collection: "Sea Turtles", inStock: true, sizes: swimShortSizes, hoverImage: "/assets/images/products/sea-turtles-swim-shorts-green-lifestyle.png", gallery: ["/assets/images/products/sea-turtles-swim-shorts-green.png", "/assets/images/products/sea-turtles-swim-shorts-green-back.png", "/assets/images/products/sea-turtles-swim-shorts-green-lifestyle.png"] },
  { slug: "cabana-stripes-swimsuit-pastel-green", name: "Cabana Stripes Swimsuit | Pastel Green", price: 34, image: "/assets/images/products/cabana-stripes-swimsuit-pastel-green.png", category: "Swimsuits", color: "Pastel Green", pattern: "Striped", collection: "Cabana Stripes", inStock: true, sizes: clothingSizes, hoverImage: "/assets/images/products/cabana-stripes-swimsuit-pastel-green-lifestyle.png", gallery: ["/assets/images/products/cabana-stripes-swimsuit-pastel-green.png", "/assets/images/products/cabana-stripes-swimsuit-pastel-green-back.png", "/assets/images/products/cabana-stripes-swimsuit-pastel-green-lifestyle.png"] },
  { slug: "cabana-stripes-bathing-towel-pastel-green", name: "Cabana Stripes Bathing Towel | Pastel Green", price: 16, image: "/assets/images/products/cabana-stripes-bathing-towel-pastel-green.png", category: "Bathing Towels", color: "Pastel Green", pattern: "Striped", collection: "Cabana Stripes", inStock: true, sizes: ["One Size"], hoverImage: "/assets/images/products/cabana-stripes-bathing-towel-pastel-green-lifestyle.png", gallery: ["/assets/images/products/cabana-stripes-bathing-towel-pastel-green.png", "/assets/images/products/cabana-stripes-bathing-towel-pastel-green-detail.png", "/assets/images/products/cabana-stripes-bathing-towel-pastel-green-lifestyle.png"] },
];

export const bestSellers = [products[6], products[7], products[5]];
export const rivieraHighlights = [products[0], products[2], products[3]];

export const productColorValues: Record<string, string> = {
  Navy: "#0e2340",
  "Pastel Green": "#d9e8d5",
  "Light Blue": "#c4ddf2",
  Aqua: "#8fd8d3",
  Ivory: "#eee8dc",
  Green: "#8fae9a",
};

export function getProductTitle(product: Product) {
  return product.name.split(" | ")[0];
}

export function getProductGallery(product: Product) {
  return product.gallery?.length ? product.gallery : [product.image];
}

export function getProductColorVariants(product: Product, catalog: Product[]) {
  const title = getProductTitle(product);
  return catalog.filter(candidate => getProductTitle(candidate) === title);
}

export function getVariantStock(product: Product, size: string) {
  return product.variants?.find(variant => variant.size === size)?.stock ?? (product.inStock ? product.stockCount ?? 6 : 0);
}