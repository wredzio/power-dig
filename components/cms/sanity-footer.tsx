import { FooterSection } from "@/components/sections/footer/footer";
import type { IconProps } from "@/components/ui/icon";
import { SanityImage } from "@/components/ui/image/sanity-image";

/** Strip locale prefix from href — next-intl Link or locale-aware routing handles this */
function stripLocalePrefix(href: string): string {
  return href.replace(/^\/(pl|en)(\/|$)/, "/");
}

interface ExpandedImageAsset {
  _id?: string;
  url?: string | null;
  metadata?: {
    lqip?: string | null;
    dimensions?: { width?: number; height?: number } | null;
  } | null;
}

interface ExpandedGalleryItem {
  _key: string;
  image?: {
    asset?: ExpandedImageAsset | null;
    alt?: string;
    hotspot?: { x?: number; y?: number; width?: number; height?: number };
    crop?: { top?: number; bottom?: number; left?: number; right?: number };
  } | null;
  aspectRatio?: "3/4" | "9/16" | "16/9" | "1/1" | "4/3" | "3/2" | null;
}

interface SanityFooterData {
  phone?: string;
  address?: string;
  mail?: string;
  social?: Array<{
    media?: "Facebook" | "Instagram" | "Twitter" | "Linkedin" | "Youtube";
    url?: string;
  }>;
  tagline?: string;
  openingHours?: Array<{ days?: string; time?: string; _key: string }>;
  footerNavLinks?: Array<{ label?: string; href?: string; _key: string }>;
  footerNavLegalLinks?: Array<{ label?: string; href?: string; _key: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  footerGalleryImages?: any[];
}

const platformToIcon: Record<string, IconProps["name"]> = {
  Facebook: "Facebook",
  Instagram: "Instagram",
  Twitter: "Twitter",
  Linkedin: "Linkedin",
  Youtube: "Youtube",
};

export function SanityFooter(props: SanityFooterData) {
  const galleryImages = (props.footerGalleryImages as ExpandedGalleryItem[] | undefined)
    ?.slice(0, 4)
    .filter((item) => item.image?.asset?.url)
    .map((item) => (
      <SanityImage
        key={item._key}
        image={item.image!}
        alt={item.image?.alt || ""}
        width={160}
        aspectRatio={item.aspectRatio || "1/1"}
        className="h-full w-full object-cover"
      />
    ));

  return (
    <FooterSection
      contact={{
        phone: props.phone || "",
        address: props.address || "",
        email: props.mail || "",
      }}
      socialLinks={
        props.social
          ?.filter((s) => s.media && s.url)
          .map((social) => ({
            platform: social.media!,
            url: social.url!,
            icon: platformToIcon[social.media!] || "Globe",
          })) || []
      }
      tagline={props.tagline}
      openingHours={props.openingHours
        ?.filter((h) => h.days && h.time)
        .map((h) => ({ days: h.days!, time: h.time! }))}
      footerNavLinks={props.footerNavLinks
        ?.filter((l) => l.label && l.href)
        .map((l) => ({ label: l.label!, href: stripLocalePrefix(l.href!) }))}
      footerNavLegalLinks={props.footerNavLegalLinks
        ?.filter((l) => l.label && l.href)
        .map((l) => ({ label: l.label!, href: stripLocalePrefix(l.href!) }))}
      footerGalleryImages={galleryImages && galleryImages.length > 0 ? galleryImages : undefined}
    />
  );
}
