import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        ...(isProd ? { allow: "/", disallow: ["/studio"] } : { disallow: "/" }),
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/sitemap.xml`,
  };
}
