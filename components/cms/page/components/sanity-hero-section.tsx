import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PageSection } from "@/components/layout/page-section/page-section";
import { HeroSection } from "@/components/sections/hero-section/hero-section";
import { SanityPicture } from "@/components/ui/image/sanity-picture";

type SanityHeroSectionProps = PageSectionItem<"heroSection">;

export const SanityHeroSection = (props: SanityHeroSectionProps) => {
  const section = props;
  return (
    <PageSection fullWidth key={section._key} className="!mt-0">
      <HeroSection
        title={section.title ?? ""}
        description={section.description ?? ""}
        overlayOpacity={section.overlayOpacity ?? undefined}
        ctaLabel={section.ctaLabel || undefined}
        ctaHref={section.ctaHref || undefined}
        image={
          section.backgroundImage?.asset && (
            <SanityPicture
              image={section.backgroundImage}
              alt={section.backgroundImage.alt || "Hero"}
              breakpoints={[
                { media: "(min-width: 1024px)", width: 1920, aspectRatio: "16/9" },
                { media: "(min-width: 768px)", width: 1024, aspectRatio: "4/3" },
              ]}
              fallbackWidth={768}
              fallbackAspectRatio="3/4"
              blurDataURL={section.backgroundImage.asset.metadata?.lqip ?? undefined}
              priority
              className="h-full w-full object-cover"
            />
          )
        }
      />
    </PageSection>
  );
};
