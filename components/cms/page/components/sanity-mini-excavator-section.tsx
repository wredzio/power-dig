import { getLocale } from "next-intl/server";

import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigMiniExcavator } from "@/components/sections/powerdig/powerdig-mini-excavator";
import { toTelHref } from "@/lib/format-phone";
import { SITE } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";

type Props = PageSectionItem<"miniExcavatorSection">;

export async function SanityMiniExcavatorSection(section: Props) {
  const locale = await getLocale();
  const settings = await getSettings(locale);
  const phone = settings?.phone || SITE.phone;

  return (
    <PowerDigMiniExcavator
      id={section.id ?? undefined}
      supra={section.supra ?? undefined}
      title={section.title ?? ""}
      paragraphs={[section.description, section.description2].filter((text): text is string =>
        Boolean(text),
      )}
      ctaLabel={section.ctaLabel ?? undefined}
      ctaHref={section.ctaHref || toTelHref(phone)}
      featuresTitle={section.featuresTitle ?? undefined}
      features={section.features ?? []}
      equipmentName={section.equipmentName ?? undefined}
      equipmentSpecs={section.equipmentSpecs ?? undefined}
    />
  );
}
