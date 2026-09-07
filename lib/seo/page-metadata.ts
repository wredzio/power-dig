import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { localizedPath, OG_LOCALES } from "@/lib/site-config";

export interface PageSeoInput {
  title?: string | null;
  metadata?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string[] | null;
    noIndex?: boolean | null;
    ogImageUrl?: string | null;
  } | null;
}

export interface SettingsSeoInput {
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  ogImageUrl?: string | null;
}

export interface BuildPageMetadataInput {
  page: PageSeoInput | null;
  settings: SettingsSeoInput | null;
  locale: string;
  slug: string;
  siteUrl: string;
}

const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

function isHomepage(slug: string): boolean {
  return slug.replace(/^\/+|\/+$/g, "") === "";
}

/**
 * Pure metadata builder shared by the homepage and dynamic pages.
 * Page-level SEO fields win, site settings fill the gaps, and the
 * generated `opengraph-image` route is used unless the CMS provides one.
 */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const { page, settings, locale, slug, siteUrl } = input;
  const siteTitle = settings?.title ?? undefined;
  const metaTitle = page?.metadata?.metaTitle || page?.title || siteTitle;
  const description = page?.metadata?.metaDescription || settings?.description || undefined;
  const keywords = page?.metadata?.keywords?.length
    ? page.metadata.keywords
    : (settings?.keywords ?? undefined);
  const ogImageUrl = page?.metadata?.ogImageUrl || settings?.ogImageUrl || undefined;

  const canonical = `${siteUrl}${localizedPath(locale, slug)}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}${localizedPath(l, slug)}`]),
  );
  languages["x-default"] = `${siteUrl}${localizedPath(routing.defaultLocale, slug)}`;

  const homepage = isHomepage(slug);
  const title: Metadata["title"] = homepage
    ? { absolute: page?.metadata?.metaTitle || siteTitle || page?.title || "" }
    : (metaTitle ?? undefined);

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    robots: page?.metadata?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: typeof title === "object" && title && "absolute" in title ? title.absolute : metaTitle,
      description,
      url: canonical,
      siteName: siteTitle,
      locale: OG_LOCALES[locale] ?? locale,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l] ?? l),
      type: "website",
      // Only set when the CMS provides an image; an explicit `images` key
      // would suppress the generated `opengraph-image` route.
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, ...OG_IMAGE_SIZE }] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}
