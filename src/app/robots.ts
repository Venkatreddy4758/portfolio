import type { MetadataRoute } from "next";

// Required for `output: export` (static GitHub Pages build).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/biodata/print"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
