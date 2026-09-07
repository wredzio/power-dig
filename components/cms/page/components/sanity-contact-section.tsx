import { getLocale, getTranslations } from "next-intl/server";

import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigContact } from "@/components/sections/powerdig/powerdig-contact";
import { resolveIconName } from "@/components/ui/icon-name";
import { formatPhoneDisplay, toTelHref } from "@/lib/format-phone";
import { SITE } from "@/lib/site-config";
import { getSettings } from "@/sanity/lib/get-settings";

type Props = PageSectionItem<"contactSection">;

export async function SanityContactSection(section: Props) {
  const locale = await getLocale();
  const [settings, t] = await Promise.all([getSettings(locale), getTranslations("contact")]);
  const phone = section.phone || settings?.phone || SITE.phone;
  const email = section.email || settings?.mail || SITE.email;

  return (
    <PowerDigContact
      id={section.id ?? undefined}
      supra={section.subtitle ?? undefined}
      title={section.title ?? ""}
      phoneHref={toTelHref(phone)}
      phoneLabel={formatPhoneDisplay(phone)}
      email={email}
      callNowLabel={t("callNow")}
      cards={(section.hours ?? [])
        .filter((card) => card.days && card.time)
        .map((card) => ({
          icon: resolveIconName(card.icon, "Phone"),
          title: card.days!,
          value: card.time!,
        }))}
    />
  );
}
