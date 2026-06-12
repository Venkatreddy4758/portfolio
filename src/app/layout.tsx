import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Cinzel,
  Manrope,
  Noto_Serif_Telugu,
  Noto_Sans_Telugu,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/system/Providers";
import { content } from "@/data/content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-telugu",
  display: "swap",
});
const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-telugu",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: content.meta.en.siteTitle,
  description: content.meta.en.siteDescription,
  openGraph: {
    title: content.meta.en.siteTitle,
    description: content.meta.en.siteDescription,
    type: "profile",
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og.png`, width: 1200, height: 630, alt: "Venkat Reddy Regulapally" }],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.en.siteTitle,
    description: content.meta.en.siteDescription,
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5e1826",
  width: "device-width",
  initialScale: 1,
};

const fontVars = [
  cormorant.variable,
  playfair.variable,
  cinzel.variable,
  manrope.variable,
  notoSerifTelugu.variable,
  notoSansTelugu.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVars} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
