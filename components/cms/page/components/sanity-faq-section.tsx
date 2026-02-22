import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PageSection } from "@/components/layout/page-section/page-section";
import { FaqSection } from "@/components/sections/faq-section/faq-section";

type SanityFaqSectionProps = PageSectionItem<"faqSection">;

export const SanityFaqSection = (props: SanityFaqSectionProps) => {
  const section = props;
  return (
    <PageSection key={section._key} id={section.id || undefined}>
      <FaqSection
        title={section.title ?? ""}
        subtitle={section.subtitle || undefined}
        items={
          section.items?.map((item) => ({
            question: item.question ?? "",
            answer: item.answer ?? "",
          })) || []
        }
      />
    </PageSection>
  );
};
