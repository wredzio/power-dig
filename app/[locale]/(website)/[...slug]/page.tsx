import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { SanityComponents } from "@/components/cms/sanity-components";
import type { PageQueryResult } from "@/components/cms/sanity-types";
import { routing } from "@/i18n/routing";
import { getClient } from "@/sanity/sanity.client";
import { allPagesQuery, pageQuery } from "@/sanity/schemas/pages/page.queries";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateStaticParams() {
  try {
    const client = getClient();

    const params: { locale: string; slug: string[] }[] = [];

    for (const locale of routing.locales) {
      const pages = await client.fetch(allPagesQuery, { language: locale });

      const localeParams =
        pages
          ?.filter((page) => page.slug?.current && page.slug.current !== "/")
          .map((page) => ({
            locale,
            slug: page.slug!.current!.split("/").filter(Boolean),
          })) || [];

      params.push(...localeParams);
    }

    return params;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugString = slug.join("/");

  const client = getClient();
  const page = await client.fetch<PageQueryResult>(pageQuery, {
    slug: slugString,
    language: locale,
  });

  if (!page) return {};

  return {
    title: page.metadata?.metaTitle || page.title,
    description: page.metadata?.metaDescription || "",
    robots: page.metadata?.noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      languages: {
        pl: `/pl/${slugString}`,
        en: `/en/${slugString}`,
      },
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const slugString = slug.join("/");

  const client = getClient();
  const page = await client.fetch<PageQueryResult>(pageQuery, {
    slug: slugString,
    language: locale,
  });

  if (!page) {
    notFound();
  }

  return page.sections && <SanityComponents pageType="page" sanityComponentsData={page.sections} />;
}
