import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";
import { getClient } from "@/sanity/sanity.client";
import { urlForOgImage } from "@/sanity/schemas/image";
import { pageQuery } from "@/sanity/schemas/pages/page.queries";

import { buildPageMetadata } from "./page-metadata";

/**
 * Fetches the page and site settings and turns them into Next.js metadata.
 * Returns `{}` for unknown slugs so `notFound()` pages keep the layout defaults.
 */
export async function getPageMetadata(slug: string, locale: string): Promise<Metadata> {
  const client = getClient();
  const [page, settings] = await Promise.all([
    client.fetch(pageQuery, { slug, language: locale }),
    getSettings(locale),
  ]);

  if (!page) return {};

  return buildPageMetadata({
    page: {
      title: page.title,
      metadata: page.metadata
        ? {
            metaTitle: page.metadata.metaTitle,
            metaDescription: page.metadata.metaDescription,
            keywords: page.metadata.keywords,
            noIndex: page.metadata.noIndex,
            ogImageUrl: urlForOgImage(page.metadata.ogImage),
          }
        : null,
    },
    settings: settings
      ? {
          title: settings.title,
          description: settings.description,
          keywords: settings.keywords,
          ogImageUrl: urlForOgImage(settings.openGraphImage),
        }
      : null,
    locale,
    slug,
    siteUrl: getSiteUrl(settings?.url),
  });
}
