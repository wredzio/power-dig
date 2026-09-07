import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigAbout } from "@/components/sections/powerdig/powerdig-about";
import { SanityPicture } from "@/components/ui/image/sanity-picture";

type Props = PageSectionItem<"aboutSection">;

const PORTRAIT = { width: 280, height: 360 } as const;

function splitParagraphs(text: string | null | undefined): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function SanityAboutSection(section: Props) {
  const image = section.image?.asset ? (
    <SanityPicture
      image={section.image}
      alt={section.image.alt || section.ownerName || section.title || ""}
      breakpoints={[
        { media: "(min-width: 768px)", width: PORTRAIT.width * 2, aspectRatio: PORTRAIT },
      ]}
      fallbackWidth={PORTRAIT.width}
      fallbackAspectRatio={PORTRAIT}
      blurDataURL={section.image.asset.metadata?.lqip ?? undefined}
    />
  ) : undefined;

  return (
    <PowerDigAbout
      id={section.id ?? undefined}
      supra={section.supra ?? undefined}
      title={section.title ?? ""}
      paragraphs={splitParagraphs(section.description)}
      stats={(section.features ?? []).map((stat) => ({
        value: stat.title ?? "",
        label: stat.description ?? "",
      }))}
      ownerName={section.ownerName ?? undefined}
      ownerTitle={section.ownerTitle ?? undefined}
      image={image}
      photoPlaceholder={section.imagePlaceholder ?? undefined}
    />
  );
}
