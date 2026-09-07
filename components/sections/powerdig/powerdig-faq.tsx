"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BRAND_ORANGE, withAlpha } from "./brand";
import { SectionHeader } from "./section-header";

export interface PowerDigFaqItem {
  question: string;
  answer: string;
}

export interface PowerDigFaqProps {
  id?: string;
  supra?: string;
  title: string;
  subtitle?: string;
  items: PowerDigFaqItem[];
}

export function PowerDigFaq({ id = "faq", supra, title, subtitle, items }: PowerDigFaqProps) {
  return (
    <section id={id} className="px-6 py-24" style={{ backgroundColor: "var(--pd-bg-section)" }}>
      <div className="mx-auto max-w-3xl">
        <SectionHeader supra={supra} title={title} subtitle={subtitle} />

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem
              key={`${item.question}-${index}`}
              value={`faq-${index}`}
              className="border-b"
              style={{ borderColor: withAlpha(BRAND_ORANGE, "33") }}
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-[#C87722] hover:no-underline [&>svg]:text-[#C87722]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed whitespace-pre-line text-[var(--pd-text-muted)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
