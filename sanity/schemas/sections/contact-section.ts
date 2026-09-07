import { defineField, defineType } from "sanity";

import { anchorIdField } from "../objects/anchor-id-field";
import { CONTACT_ICON_OPTIONS } from "../objects/section-icon-options";

export const contactSection = defineType({
  name: "contactSection",
  type: "object",
  title: "Kontakt",
  fields: [
    anchorIdField("kontakt"),
    defineField({ name: "subtitle", type: "string", title: "Napis nad tytułem" }),
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
      description: "Puste = numer z ustawień strony",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "E-mail",
      description: "Puste = e-mail z ustawień strony",
      validation: (Rule) => Rule.email(),
    }),
    defineField({ name: "address", type: "string", title: "Obszar działania / adres" }),
    defineField({
      name: "hours",
      type: "array",
      title: "Karty informacyjne",
      description: "Trzy krótkie karty pod danymi kontaktowymi",
      of: [
        {
          type: "object",
          name: "contactCard",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              title: "Ikona",
              options: { list: [...CONTACT_ICON_OPTIONS] },
            }),
            defineField({
              name: "days",
              type: "string",
              title: "Tytuł karty",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "time",
              type: "string",
              title: "Treść karty",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "days", subtitle: "time" } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: { select: { title: "title" } },
});
