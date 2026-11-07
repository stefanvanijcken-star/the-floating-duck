import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { CartProvider } from "@/components/commerce/cart-provider";
import { CurrencyProvider } from "@/components/commerce/currency-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins", display: "swap" });
const cooper = localFont({ src: "../../../public/fonts/cooper-bold.woff2", weight: "700", variable: "--font-cooper", display: "swap" });

export const metadata: Metadata = {
  title: { default: "The Floating Duck", template: "%s | The Floating Duck" },
  description: "Luxury swimwear created with care.",
};

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${poppins.variable} ${cooper.variable}`}><body><CurrencyProvider><CartProvider><Header /><main>{children}</main><Footer /></CartProvider></CurrencyProvider></body></html>;
}
