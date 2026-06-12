import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, Cinzel } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/system/Providers";
import { content } from "@/data/content";

// Luxury fashion-house serif for display + a clean geometric sans for body.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-sans",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
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
  themeColor: "#123a30",
  width: "device-width",
  initialScale: 1,
};

const fontVars = [bodoni.variable, jost.variable, cinzel.variable].join(" ");

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
