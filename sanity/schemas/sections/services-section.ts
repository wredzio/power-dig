import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";
import { SERVICE_ICON_OPTIONS } from "../objects/section-icon-options";

export const servicesSection = defineType({
  name: "servicesSection",
  type: "object",
  title: "Usługi",
  fields: [
    anchorIdField("uslugi"),
    defineField({ name: "supra", type: "string", title: "Napis nad tytułem" }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "subtitle", type: "text", title: "Podtytuł", rows: 2 }),
    defineField({
      name: "services",
      type: "array",
      title: "Usługi",
      of: [
        {
          type: "object",
          name: "service",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              title: "Ikona",
              options: { list: [...SERVICE_ICON_OPTIONS] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tag",
              type: "string",
              title: "Plakietka",
              description: "Krótka kategoria nad tytułem (np. „Instalacje”)",
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Nazwa usługi",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Opis",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "details",
              type: "array",
              title: "Zakres (lista)",
              description: "Opcjonalna lista punktów, np. rodzaje urządzeń",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
            defineField({
              name: "note",
              type: "string",
              title: "Uwaga",
              description: "Wyróżniona informacja, np. „Nie naprawiamy RTV”",
            }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Usługi" }) },
});
