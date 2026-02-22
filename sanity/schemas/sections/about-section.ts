import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  type: "object",
  title: "About Section",
  fields: [
    defineField({
      name: "id",
      type: "string",
      title: "ID sekcji (anchor)",
      description: "ID używane do linkowania (np. 'o-nas' dla /#o-nas)",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          if (!/^[a-z0-9-]+$/.test(value)) {
            return "ID może zawierać tylko małe litery, cyfry i myślniki";
          }
          return true;
        }),
    }),
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
      rows: 4,
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              type: "string",
              title: "Ikona (nazwa Lucide)",
              description: "Nazwa ikony z lucide-react (np. Shield, Zap, Heart)",
            },
            {
              name: "title",
              type: "string",
              title: "Tytuł",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Opis",
              rows: 3,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "icon" },
          },
        },
      ],
    }),
  ],
});
