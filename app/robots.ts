import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        ...(isProd ? { allow: "/", disallow: ["/studio"] } : { disallow: "/" }),
      },
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
