import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getSiteUrl, localizedPath } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";
import { getClient } from "@/sanity/sanity.client";

const allPagesForSitemapQuery = `*[_type == "page" && !(metadata.noIndex == true)]{
  "slug": slug.current,
  language,
  _updatedAt
}`;

interface SitemapPage {
  slug: string | null;
  language: string | null;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = getClient();
  const [pages, settings] = await Promise.all([
    client.fetch<SitemapPage[]>(allPagesForSitemapQuery, {}, { next: { revalidate: 3600 } }),
    getSettings(routing.defaultLocale),
  ]);
  const siteUrl = getSiteUrl(settings?.url);

  const bySlug = new Map<string, { language: string; updatedAt: string }[]>();
  for (const page of pages ?? []) {
    if (!page.slug) continue;
    const entry = { language: page.language ?? routing.defaultLocale, updatedAt: page._updatedAt };
    bySlug.set(page.slug, [...(bySlug.get(page.slug) ?? []), entry]);
  }

  return [...bySlug.entries()].map(([slug, locales]) => {
    const languages = Object.fromEntries(
      locales.map(({ language }) => [language, `${siteUrl}${localizedPath(language, slug)}`]),
    );
    const defaultEntry = locales.find((l) => l.language === routing.defaultLocale) ?? locales[0];
    const lastModified = locales.reduce(
      (latest, { updatedAt }) => (updatedAt > latest ? updatedAt : latest),
      locales[0].updatedAt,
    );

    return {
      url: `${siteUrl}${localizedPath(defaultEntry.language, slug)}`,
      lastModified: new Date(lastModified),
      changeFrequency: slug === "/" ? "weekly" : "monthly",
      priority: slug === "/" ? 1 : 0.7,
      alternates: { languages: { ...languages, "x-default": languages[defaultEntry.language] } },
    };
  });
}
