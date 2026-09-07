import { getLocale, getTranslations } from "next-intl/server";

import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigHero } from "@/components/sections/powerdig/powerdig-hero";
import { formatPhoneDisplay, toTelHref } from "@/lib/format-phone";
import { SITE } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";

type Props = PageSectionItem<"heroSection">;

const DEFAULT_SERVICES_ANCHOR = "#uslugi";

export async function SanityHeroSection(section: Props) {
  const locale = await getLocale();
  const [settings, t] = await Promise.all([getSettings(locale), getTranslations("hero")]);
  const phone = settings?.phone || SITE.phone;

  return (
    <PowerDigHero
      id={section.id ?? undefined}
      title={section.title ?? SITE.shortName}
      tagline={section.description ?? undefined}
      serviceTags={section.tags ?? []}
      ctaPhoneHref={toTelHref(phone)}
      ctaPhoneLabel={formatPhoneDisplay(phone)}
      ctaServicesLabel={section.ctaLabel || t("services")}
      ctaServicesHref={section.ctaHref || DEFAULT_SERVICES_ANCHOR}
    />
  );
}
