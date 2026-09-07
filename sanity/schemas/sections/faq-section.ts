import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const faqSection = defineType({
  name: "faqSection",
  type: "object",
  title: "FAQ",
  fields: [
    anchorIdField("faq"),
    defineField({ name: "supra", type: "string", title: "Napis nad tytułem" }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "subtitle", type: "text", title: "Podtytuł", rows: 2 }),
    defineField({
      name: "items",
      type: "array",
      title: "Pytania i odpowiedzi",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              type: "string",
              title: "Pytanie",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              title: "Odpowiedź",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => ({
      title: title || "FAQ",
      subtitle: `${Array.isArray(items) ? items.length : 0} pytań`,
    }),
  },
});
