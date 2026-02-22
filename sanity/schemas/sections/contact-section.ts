import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  type: "object",
  title: "Contact Section",
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
      name: "phone",
      type: "string",
      title: "Telefon",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Adres",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Podtytuł",
      description: "Opcjonalny tekst pod tytułem sekcji",
    }),
    defineField({
      name: "hours",
      type: "array",
      title: "Godziny otwarcia",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              type: "string",
              title: "Dni (np. Pn-Czw)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "time",
              type: "string",
              title: "Godziny (np. 17:00–01:00)",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "days", subtitle: "time" },
          },
        },
      ],
    }),
  ],
});
