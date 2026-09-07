import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const heroSection = defineType({
  name: "heroSection",
  type: "object",
  title: "Hero",
  fields: [
    anchorIdField("hero"),
    defineField({
      name: "title",
      type: "string",
      title: "Nagłówek H1",
      description:
        "Pierwsze słowo trafia do górnej linii, reszta do dolnej (np. „PowerDig Serwis”)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Hasło (tagline)",
      rows: 2,
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Etykiety usług",
      description: "Krótkie plakietki pod hasłem (np. „Instalacje”, „Serwis AGD”)",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      title: "Tekst przycisku „Nasze usługi”",
    }),
    defineField({
      name: "ctaHref",
      type: "string",
      title: "Link przycisku",
      description: "Np. #uslugi",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
