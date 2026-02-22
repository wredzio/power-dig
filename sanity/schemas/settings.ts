import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  type: "document",
  title: "Ustawienia",
  icon: CogIcon,
  groups: [
    { title: "SEO & metadata", name: "metadata" },
    { title: "Nawigacja", name: "navigation" },
    { title: "Stopka", name: "footer" },
  ],
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Site title",
      group: "metadata",
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "url",
      description: "The main site url. Used to create canonical url",
      group: "metadata",
    }),
    defineField({
      name: "navigation",
      type: "object",
      title: "Nawigacja",
      group: "navigation",
      fields: [
        defineField({
          name: "navigationLinks",
          type: "array",
          title: "Linki nawigacyjne",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  type: "string",
                  title: "Etykieta",
                  validation: (Rule) => Rule.required().max(30),
                },
                {
                  name: "href",
                  type: "string",
                  title: "Link",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "external",
                  type: "boolean",
                  title: "Link zewnętrzny",
                  initialValue: false,
                },
                {
                  name: "order",
                  type: "number",
                  title: "Kolejność",
                  validation: (Rule) => Rule.required().integer().min(1),
                },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "href",
                  order: "order",
                },
                prepare({ title, subtitle, order }) {
                  return {
                    title: `${order}. ${title}`,
                    subtitle: subtitle,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Contact Phone",
      group: "footer",
    }),
    defineField({
      name: "mail",
      type: "string",
      title: "Contact Email",
      group: "footer",
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Adres",
      group: "footer",
    }),
    defineField({
      group: "footer",
      name: "social",
      type: "array",
      title: "Social Links",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "media",
              title: "Choose Social Media",
              options: {
                list: [
                  { title: "Twitter", value: "Twitter" },
                  { title: "Facebook", value: "Facebook" },
                  { title: "Instagram", value: "Instagram" },
                  { title: "Linkedin", value: "Linkedin" },
                  { title: "Youtube", value: "Youtube" },
                ],
              },
            },
            {
              type: "url",
              name: "url",
              title: "Full Profile URL",
            },
          ],
          preview: {
            select: {
              title: "media",
              subtitle: "url",
            },
          },
        },
      ],
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Tagline serwisu",
      group: "footer",
    }),
    defineField({
      name: "openingHours",
      type: "array",
      title: "Godziny otwarcia",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "days",
              type: "string",
              title: "Dni",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "time",
              type: "string",
              title: "Godziny",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "days",
              subtitle: "time",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerNavLinks",
      type: "array",
      title: "Linki nawigacyjne stopki",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Etykieta",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              type: "string",
              title: "Link",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerNavLegalLinks",
      type: "array",
      title: "Linki prawne stopki",
      group: "footer",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Etykieta",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              type: "string",
              title: "Link",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerGalleryImages",
      type: "array",
      title: "Miniaturki w stopce",
      group: "footer",
      of: [{ type: "responsiveImage" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      title: "Meta Description",
      name: "description",
      group: "metadata",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.min(120).max(160),
    }),
    defineField({
      title: "Meta Keywords",
      name: "keywords",
      group: "metadata",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      group: "metadata",
    }),
  ],
});
