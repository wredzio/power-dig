import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PageSection } from "@/components/layout/page-section/page-section";
import { SubheadingSection } from "@/components/sections/subheading-section/subheading-section";

type SanitySubheadingSectionProps = PageSectionItem<"subheadingSection">;

export const SanitySubheadingSection = (props: SanitySubheadingSectionProps) => {
  const section = props;
  return (
    <PageSection key={section._key} id={section.id || undefined}>
      <SubheadingSection text={section.text ?? ""} />
    </PageSection>
  );
};
