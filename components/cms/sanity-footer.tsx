import { FooterSection } from "@/components/sections/footer/footer";
import type { IconProps } from "@/components/ui/icon";
import type { SiteSettings } from "@/sanity/lib/get-settings";

/** Strip locale prefix from href — next-intl Link adds it back. */
function stripLocalePrefix(href: string): string {
  return href.replace(/^\/(pl|en)(\/|$)/, "/");
}

const platformToIcon: Record<string, IconProps["name"]> = {
  Facebook: "Facebook",
  Instagram: "Instagram",
  Twitter: "Twitter",
  Linkedin: "Linkedin",
  Youtube: "Youtube",
};

export function SanityFooter(settings: SiteSettings) {
  return (
    <FooterSection
      contact={{
        phone: settings.phone || "",
        address: settings.address || "",
        email: settings.mail || "",
      }}
      socialLinks={(settings.social ?? [])
        .filter((s) => s.media && s.url)
        .map((social) => ({
          platform: social.media!,
          url: social.url!,
          icon: platformToIcon[social.media!] || "Globe",
        }))}
      tagline={settings.tagline ?? undefined}
      openingHours={(settings.openingHours ?? [])
        .filter((h) => h.days && h.time)
        .map((h) => ({ days: h.days!, time: h.time! }))}
      footerNavLinks={(settings.footerNavLinks ?? [])
        .filter((l) => l.label && l.href)
        .map((l) => ({ label: l.label!, href: stripLocalePrefix(l.href!) }))}
      footerNavLegalLinks={(settings.footerNavLegalLinks ?? [])
        .filter((l) => l.label && l.href)
        .map((l) => ({ label: l.label!, href: stripLocalePrefix(l.href!) }))}
    />
  );
}
