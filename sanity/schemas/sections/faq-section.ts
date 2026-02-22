import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  type: "object",
  title: "FAQ Section",
  fields: [
    defineField({
      name: "id",
      type: "string",
      title: "ID sekcji (anchor)",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          if (!/^[a-z0-9-]+$/.test(value)) {
            return "ID może zawierać tylko małe litery, cyfry i myślniki";
          }
          return true;
        }),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Podtytuł",
      rows: 2,
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Pytania i odpowiedzi",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Pytanie",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              type: "text",
              title: "Odpowiedź",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
