import type { MetadataRoute } from "next";

import { getClient } from "@/sanity/sanity.client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const allPagesForSitemapQuery = `*[_type == "page"]{
  "slug": slug.current,
  language,
  _updatedAt
}`;

function pageUrl(locale: string, slug: string): string {
  return slug === "/" ? `${siteUrl}/${locale}` : `${siteUrl}/${locale}/${slug}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = getClient();

  const pages = await client.fetch<{ slug: string; language: string; _updatedAt: string }[]>(
    allPagesForSitemapQuery,
    {},
    { next: { revalidate: 3600 } },
  );

  // Group pages by slug so we can create one entry per slug with all locale alternates
  const pagesBySlug = new Map<string, { language: string; updatedAt: string }[]>();
  for (const page of pages ?? []) {
    const slug = page.slug;
    if (!slug) continue;
    if (!pagesBySlug.has(slug)) pagesBySlug.set(slug, []);
    pagesBySlug.get(slug)!.push({ language: page.language ?? "pl", updatedAt: page._updatedAt });
  }

  const pageEntries: MetadataRoute.Sitemap = [];
  for (const [slug, locales] of pagesBySlug.entries()) {
    const alternates: Record<string, string> = {};
    for (const { language } of locales) {
      alternates[language] = pageUrl(language, slug);
    }
    const latestUpdate = locales.reduce(
      (latest, { updatedAt }) => (updatedAt > latest ? updatedAt : latest),
      locales[0].updatedAt,
    );
    pageEntries.push({
      url: pageUrl(locales[0].language, slug),
      lastModified: new Date(latestUpdate),
      changeFrequency: "weekly",
      priority: slug === "/" ? 1 : 0.8,
      alternates: { languages: alternates },
    });
  }

  return pageEntries;
}
