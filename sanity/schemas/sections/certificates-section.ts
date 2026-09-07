import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const certificatesSection = defineType({
  name: "certificatesSection",
  type: "object",
  title: "Certyfikaty i uprawnienia",
  fields: [
    anchorIdField("certyfikaty"),
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
      title: "Certyfikaty",
      of: [
        {
          type: "object",
          name: "certificate",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Nazwa",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "issuer",
              type: "string",
              title: "Wydawca",
              description: "Np. SEP, producent, jednostka certyfikująca",
            }),
            defineField({ name: "number", type: "string", title: "Numer / zakres" }),
            defineField({ name: "validUntil", type: "date", title: "Ważny do" }),
            defineField({ name: "description", type: "text", title: "Opis", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              title: "Skan / logo",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string", title: "Tekst alternatywny" })],
            }),
          ],
          preview: { select: { title: "title", subtitle: "issuer", media: "image" } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({ name: "footnote", type: "string", title: "Przypis" }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => ({
      title: title || "Certyfikaty",
      subtitle: `${Array.isArray(items) ? items.length : 0} pozycji`,
    }),
  },
});
