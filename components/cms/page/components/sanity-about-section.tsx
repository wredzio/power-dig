import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PageSection } from "@/components/layout/page-section/page-section";
import { AboutSection } from "@/components/sections/about-section/about-section";
import type { IconProps } from "@/components/ui/icon";

type SanityAboutSectionProps = PageSectionItem<"aboutSection">;

export const SanityAboutSection = (props: SanityAboutSectionProps) => {
  const section = props;
  return (
    <PageSection key={section._key} id={section.id || undefined}>
      <AboutSection
        title={section.title ?? ""}
        description={section.description || undefined}
        features={section.features?.map((f) => ({
          icon: (f.icon as IconProps["name"]) || undefined,
          title: f.title ?? "",
          description: f.description || undefined,
        }))}
      />
    </PageSection>
  );
};
