import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  type: "object",
  title: "Hero Section",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "supra",
      type: "string",
      title: "Napis nad tytułem (supra)",
      description: "Złoty napis wyświetlany nad głównym tytułem",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Opis",
      rows: 4,
    }),
    defineField({
      name: "ctaLabel",
      type: "string",
      title: "CTA Button Label",
      description: "Tekst przycisku CTA (opcjonalny)",
    }),
    defineField({
      name: "ctaHref",
      type: "string",
      title: "CTA Button Link",
      description: "Link przycisku CTA",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Obraz tła",
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
      name: "overlayOpacity",
      type: "number",
      title: "Przezroczystość nakładki",
      description: "Wartość od 0 (brak nakładki) do 100 (pełne przyciemnienie)",
      initialValue: 60,
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
});
