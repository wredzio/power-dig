import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { DividerSection } from "@/components/sections/divider-section/divider-section";
import { SanityPicture } from "@/components/ui/image/sanity-picture";

type SanityDividerSectionProps = PageSectionItem<"dividerSection">;

export const SanityDividerSection = (props: SanityDividerSectionProps) => {
  const section = props;

  return (
    <DividerSection
      style={(section.style as "tartan" | "solid" | "line") ?? "solid"}
      height={(section.height as "sm" | "md" | "lg") ?? "md"}
      image={
        section.image?.asset && (
          <SanityPicture
            image={section.image}
            alt=""
            breakpoints={[
              { media: "(min-width: 768px)", width: 1920, aspectRatio: { width: 16, height: 3 } },
            ]}
            fallbackWidth={768}
            fallbackAspectRatio={{ width: 16, height: 3 }}
            blurDataURL={section.image.asset.metadata?.lqip ?? undefined}
            className="h-full w-full object-cover"
          />
        )
      }
    />
  );
};
