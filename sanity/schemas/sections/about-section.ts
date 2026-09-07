import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const aboutSection = defineType({
  name: "aboutSection",
  type: "object",
  title: "O nas",
  fields: [
    anchorIdField("o-nas"),
    defineField({ name: "supra", type: "string", title: "Napis nad tytułem" }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Opis",
      description: "Akapity oddzielaj pustą linią",
      rows: 8,
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Statystyki",
      description: "Wartość (np. „10+”) i etykieta (np. „Lat doświadczenia”)",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Wartość",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "string",
              title: "Etykieta",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Zdjęcie właściciela",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Tekst alternatywny",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "ownerName",
      type: "string",
      title: "Podpis pod zdjęciem – imię i nazwisko",
    }),
    defineField({
      name: "ownerTitle",
      type: "string",
      title: "Podpis pod zdjęciem – tytuł",
      description: "Np. „Właściciel · Elektryk SEP”",
    }),
    defineField({
      name: "imagePlaceholder",
      type: "string",
      title: "Tekst zastępczy, gdy brak zdjęcia",
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
