import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { SanityComponents } from "@/components/cms/sanity-components";
import { routing } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo/get-page-metadata";
import { getClient } from "@/sanity/sanity.client";
import { allPagesQuery, pageQuery } from "@/sanity/schemas/pages/page.queries";

// ISR: pick up Studio edits within a minute without a redeploy.
export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateStaticParams() {
  try {
    const client = getClient();
    const params: { locale: string; slug: string[] }[] = [];

    for (const locale of routing.locales) {
      const pages = await client.fetch(allPagesQuery, { language: locale });
      for (const page of pages ?? []) {
        const current = page.slug?.current;
        if (!current || current === "/") continue;
        params.push({ locale, slug: current.split("/").filter(Boolean) });
      }
    }

    return params;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  return getPageMetadata(slug.join("/"), locale);
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const client = getClient();
  const page = await client.fetch(pageQuery, { slug: slug.join("/"), language: locale });

  if (!page) {
    notFound();
  }

  return page.sections && <SanityComponents pageType="page" sanityComponentsData={page.sections} />;
}
