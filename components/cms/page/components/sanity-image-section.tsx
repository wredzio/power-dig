import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { RichText } from "@/components/cms/shared/rich-text/rich-text";
import { PageSection } from "@/components/layout/page-section/page-section";
import { ImageSection } from "@/components/sections/image-section/image-section";
import { SanityImage } from "@/components/ui/image/sanity-image";

type SanityImageSectionProps = PageSectionItem<"imageSection">;

export const SanityImageSection = (props: SanityImageSectionProps) => {
  const section = props;
  const fullWidth = section.fullWidth || false;

  return (
    <PageSection key={section._key} fullWidth={fullWidth}>
      <ImageSection
        title={section.title ?? ""}
        description={section.body ? <RichText value={section.body} /> : null}
        layout={section.layout ?? "left"}
        image={
          section.image?.image?.asset && (
            <SanityImage
              image={section.image.image}
              alt={section.image.image.alt || section.title || ""}
              width={1280}
              aspectRatio={section.image.aspectRatio || "16/9"}
              className="h-auto w-full object-cover"
            />
          )
        }
      />
    </PageSection>
  );
};
