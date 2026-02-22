import { defineField, defineType } from "sanity";

export const dividerSection = defineType({
  name: "dividerSection",
  type: "object",
  title: "Divider Section",
  fields: [
    defineField({
      name: "style",
      type: "string",
      title: "Styl",
      options: {
        list: [
          { title: "Tartan", value: "tartan" },
          { title: "Pełny pas", value: "solid" },
          { title: "Linia", value: "line" },
        ],
      },
      initialValue: "solid",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Grafika (opcjonalna, dla stylu tartan)",
      options: { hotspot: true },
    }),
    defineField({
      name: "height",
      type: "string",
      title: "Wysokość",
      options: {
        list: [
          { title: "Mała (40px)", value: "sm" },
          { title: "Średnia (80px)", value: "md" },
          { title: "Duża (120px)", value: "lg" },
        ],
      },
      initialValue: "md",
    }),
  ],
  preview: {
    select: {
      style: "style",
      height: "height",
    },
    prepare({ style, height }) {
      return {
        title: "Divider",
        subtitle: `${style ?? "solid"} / ${height ?? "md"}`,
      };
    },
  },
});
