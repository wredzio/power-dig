import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";

export const gallerySection = defineType({
  name: "gallerySection",
  type: "object",
  title: "Galeria",
  fields: [
    anchorIdField("galeria"),
    defineField({ name: "supra", type: "string", title: "Napis nad tytułem" }),
    defineField({
      name: "title",
      type: "string",
      title: "Tytuł",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "subtitle", type: "text", title: "Podtytuł", rows: 2 }),
    defineField({
      name: "images",
      type: "array",
      title: "Zdjęcia realizacji",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Zdjęcie",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Tekst alternatywny",
              description: "Opis zdjęcia dla czytników ekranu i SEO",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "caption", type: "string", title: "Podpis" }),
            defineField({
              name: "category",
              type: "string",
              title: "Kategoria",
              description: "Np. „Instalacje”, „Smart home”",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "category", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Zdjęcie",
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "footnote",
      type: "string",
      title: "Przypis",
      description: "Wyświetlany pod galerią (albo zamiast niej, gdy brak zdjęć)",
    }),
  ],
  preview: {
    select: { title: "title", images: "images" },
    prepare: ({ title, images }) => ({
      title: title || "Galeria",
      subtitle: `${Array.isArray(images) ? images.length : 0} zdjęć`,
    }),
  },
});
