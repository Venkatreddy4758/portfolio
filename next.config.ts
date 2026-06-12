import type { NextConfig } from "next";

// Static export for GitHub Pages is enabled when GITHUB_PAGES=true (set by the
// deploy workflow). Local `npm run dev` / `npm run build` stay fully featured.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "portfolio"; // GitHub repo name → site lives at /<repo>/

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath: `/${repo}`,
      assetPrefix: `/${repo}/`,
      trailingSlash: true,
      images: {
        // GitHub Pages has no image optimizer — serve images as-is.
        unoptimized: true,
      },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        qualities: [60, 75, 85, 90],
        deviceSizes: [375, 430, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      },
    };

export default nextConfig;
