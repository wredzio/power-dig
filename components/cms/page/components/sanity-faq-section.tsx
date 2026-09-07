import type { PageSectionItem } from "@/components/cms/page/sanity-page";
import { PowerDigFaq } from "@/components/sections/powerdig/powerdig-faq";
import { buildFaqJsonLd } from "@/lib/seo/json-ld";

type Props = PageSectionItem<"faqSection">;

export function SanityFaqSection(section: Props) {
  const items = (section.items ?? [])
    .filter((item) => item.question && item.answer)
    .map((item) => ({ question: item.question!, answer: item.answer! }));

  return (
    <>
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }}
        />
      )}
      <PowerDigFaq
        id={section.id ?? undefined}
        supra={section.supra ?? undefined}
        title={section.title ?? ""}
        subtitle={section.subtitle ?? undefined}
        items={items}
      />
    </>
  );
}
