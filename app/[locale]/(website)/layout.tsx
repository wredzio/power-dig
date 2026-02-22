import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteLayout } from "@/components/layout/site-layout";
import { getSettings } from "@/sanity/lib/get-settings";
import { getNavigationData } from "@/sanity/sanity.client";
import { urlForImage } from "@/sanity/schemas/image";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSettings(locale);

  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  return {
    metadataBase: settings?.url ? new URL(settings.url) : null,
    title: {
      default: settings?.title ?? "Core3",
      template: `%s | ${settings?.title ?? "Core3"}`,
    },
    description: settings?.description || "",
    alternates: {
      canonical: settings?.url
        ? new URL(locale === "pl" ? settings.url : `${settings.url}/en`)
        : null,
      languages: {
        pl: settings?.url ? settings.url : "/",
        en: settings?.url ? `${settings.url}/en` : "/en",
      },
    },
    keywords: settings?.keywords ?? [],
    openGraph: {
      title: settings?.title,
      description: settings?.description,
      url: settings?.url
        ? locale === "pl"
          ? settings.url
          : `${settings.url}/en`
        : undefined,
      images: [
        {
          url: urlForImage(settings?.openGraphImage)?.src || "/og-default.jpg",
          width: 800,
          height: 600,
        },
      ],
      locale: ogLocale,
      alternateLocale: [locale === "pl" ? "en_US" : "pl_PL"],
      type: "website",
    },
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [navigationData] = await Promise.all([getNavigationData(locale)]);

  const navigationLinks = (navigationData?.navigation?.navigationLinks ?? []).map((link) => {
    // Strip locale prefix from href — next-intl's Link adds it automatically
    const rawHref = link.href ?? "";
    const href = rawHref.replace(/^\/(pl|en)(\/|$)/, "/");
    const label = link.label ?? "";

    return {
      label,
      href,
      external: link.external ?? false,
    };
  });

  return (
    <SiteLayout>
      <SiteLayout.Header navigationLinks={navigationLinks} />
      <SiteLayout.Main>{children}</SiteLayout.Main>
      <SiteLayout.Footer />
    </SiteLayout>
  );
}
