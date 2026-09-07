import { getLocale, getTranslations } from "next-intl/server";

import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigCertificates } from "@/components/sections/powerdig/powerdig-certificates";
import { SanityImage } from "@/components/ui/image/sanity-image";

type Props = PageSectionItem<"certificatesSection">;

const IMAGE_WIDTH = 640;
const DEFAULT_ASPECT = { width: 3, height: 2 } as const;

function naturalAspect(
  dimensions: { width?: number | null; height?: number | null } | null | undefined,
): { width: number; height: number } {
  return dimensions?.width && dimensions?.height
    ? { width: dimensions.width, height: dimensions.height }
    : DEFAULT_ASPECT;
}

function formatValidUntil(value: string, locale: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(date);
}

export async function SanityCertificatesSection(section: Props) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("certificates")]);

  const items = (section.items ?? []).map((item) => {
    const formatted = item.validUntil ? formatValidUntil(item.validUntil, locale) : null;
    return {
      title: item.title ?? "",
      issuer: item.issuer ?? undefined,
      number: item.number ?? undefined,
      validUntilLabel: formatted ? t("validUntil", { date: formatted }) : undefined,
      description: item.description ?? undefined,
      image: item.image?.asset ? (
        <SanityImage
          image={item.image}
          alt={item.image.alt || item.title || ""}
          width={IMAGE_WIDTH}
          aspectRatio={naturalAspect(item.image.asset.metadata?.dimensions)}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        />
      ) : undefined,
    };
  });

  return (
    <PowerDigCertificates
      id={section.id ?? undefined}
      supra={section.supra ?? undefined}
      title={section.title ?? ""}
      subtitle={section.subtitle ?? undefined}
      footnote={section.footnote ?? undefined}
      items={items}
    />
  );
}
