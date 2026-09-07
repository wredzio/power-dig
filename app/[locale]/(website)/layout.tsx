import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteLayout } from "@/components/layout/site-layout";
import { buildLocalBusinessJsonLd } from "@/lib/seo/json-ld";
import { getSiteUrl, OG_LOCALES, SITE } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";
import { getNavigationData } from "@/sanity/sanity.client";
import { urlForLogo } from "@/sanity/schemas/image";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LOCALE_PREFIX = /^\/(pl|en)(\/|$)/;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSettings(locale);
  const siteUrl = getSiteUrl(settings?.url);
  const title = settings?.title || SITE.shortName;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${title}` },
    description: settings?.description ?? undefined,
    applicationName: SITE.shortName,
    keywords: settings?.keywords ?? undefined,
    openGraph: { siteName: title, locale: OG_LOCALES[locale] ?? locale, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [navigationData, settings] = await Promise.all([
    getNavigationData(locale),
    getSettings(locale),
  ]);

  const navigationLinks = (navigationData?.navigation?.navigationLinks ?? [])
    .filter((link) => link.label && link.href)
    .map((link, index, all) => ({
      label: link.label!,
      // next-intl's Link adds the locale prefix itself.
      href: link.href!.replace(LOCALE_PREFIX, "/"),
      external: link.external ?? false,
      isCtaButton: index === all.length - 1,
    }));

  const jsonLd = buildLocalBusinessJsonLd({
    name: settings?.title || SITE.name,
    url: getSiteUrl(settings?.url),
    phone: settings?.phone || SITE.phone,
    email: settings?.mail || SITE.email,
    description: settings?.description,
    logoUrl: urlForLogo(settings?.logo) ?? `${getSiteUrl(settings?.url)}/icon.png`,
    areaServed: settings?.areaServed || SITE.areaServed,
    openingHours: settings?.openingHours,
    locale,
  });

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteLayout.Header navigationLinks={navigationLinks} />
      <SiteLayout.Main>{children}</SiteLayout.Main>
      <SiteLayout.Footer />
      <Analytics />
      <SpeedInsights />
    </SiteLayout>
  );
}
