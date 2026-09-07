import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SanityComponents } from "@/components/cms/sanity-components";
import { SetupNotice } from "@/components/layout/setup-notice/setup-notice";
import { getPageMetadata } from "@/lib/seo/get-page-metadata";
import { getClient } from "@/sanity/sanity.client";
import { pageQuery } from "@/sanity/schemas/pages/page.queries";

// ISR: pick up Studio edits within a minute without a redeploy.
export const revalidate = 60;

const HOME_SLUG = "/";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(HOME_SLUG, locale);
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const client = getClient();
  const page = await client.fetch(pageQuery, { slug: HOME_SLUG, language: locale });

  if (!page?.sections?.length) {
    return <SetupNotice />;
  }

  return <SanityComponents pageType="page" sanityComponentsData={page.sections} />;
}
