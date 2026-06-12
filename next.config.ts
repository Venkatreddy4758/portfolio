import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats first; Next falls back automatically.
    formats: ["image/avif", "image/webp"],
    // Next.js 16 requires an explicit qualities allowlist for the quality prop.
    qualities: [60, 75, 85, 90],
    deviceSizes: [375, 430, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
