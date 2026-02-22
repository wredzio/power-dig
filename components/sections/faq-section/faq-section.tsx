"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle?: string;
  items: FaqItem[];
}

export const FaqSection = (props: FaqSectionProps) => {
  const { title, subtitle, items } = props;

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
          <div className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent" />
          {subtitle && <p className="text-muted-foreground mt-5 text-lg">{subtitle}</p>}
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
