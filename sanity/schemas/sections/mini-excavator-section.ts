import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const miniExcavatorSection = defineType({
  name: "miniExcavatorSection",
  type: "object",
  title: "Minikoparka",
  fields: [
    anchorIdField("koparka"),
    defineField({ name: "supra", type: "string", title: "Napis nad tytułem" }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      description: "Enter dzieli tytuł na linie",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", type: "text", title: "Opis", rows: 5 }),
    defineField({ name: "description2", type: "text", title: "Opis dodatkowy", rows: 4 }),
    defineField({ name: "ctaLabel", type: "string", title: "Tekst przycisku CTA" }),
    defineField({
      name: "ctaHref",
      type: "string",
      title: "Link CTA",
      description: "Puste = telefon z ustawień strony",
    }),
    defineField({ name: "featuresTitle", type: "string", title: "Tytuł listy zakresu prac" }),
    defineField({
      name: "features",
      type: "array",
      title: "Zakres prac",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "equipmentName", type: "string", title: "Nazwa sprzętu" }),
    defineField({
      name: "equipmentSpecs",
      type: "string",
      title: "Specyfikacja sprzętu",
      description: "Np. „Szerokość robocza: 1 m | Głębokość: 1,8 m”",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "equipmentName" },
    prepare: ({ title, subtitle }) => ({ title: title || "Minikoparka", subtitle }),
  },
});
