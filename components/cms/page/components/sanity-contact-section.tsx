import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PageSection } from "@/components/layout/page-section/page-section";
import { ContactSection } from "@/components/sections/contact-section/contact-section";

type SanityContactSectionProps = PageSectionItem<"contactSection">;

export const SanityContactSection = (props: SanityContactSectionProps) => {
  const section = props;
  return (
    <PageSection fullWidth key={section._key} id={section.id || undefined}>
      <ContactSection
        title={section.title ?? ""}
        phone={section.phone ?? ""}
        address={section.address ?? ""}
        email={section.email ?? ""}
        hours={
          section.hours
            ?.filter((h) => h.days && h.time)
            .map((h) => ({ days: h.days!, time: h.time! })) ?? undefined
        }
      />
    </PageSection>
  );
};
