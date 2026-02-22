import { defineField, defineType } from "sanity";

export const responsiveImage = defineType({
  name: "responsiveImage",
  type: "object",
  title: "Responsive Image",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Grafika",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Tekst alternatywny",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      title: "Proporcje obrazu",
      options: {
        list: [
          { title: "3:4 (pionowy)", value: "3/4" },
          { title: "9:16 (pionowy)", value: "9/16" },
          { title: "16:9 (panorama)", value: "16/9" },
          { title: "1:1 (kwadrat)", value: "1/1" },
          { title: "4:3 (poziomy)", value: "4/3" },
          { title: "3:2 (poziomy)", value: "3/2" },
        ],
      },
      initialValue: "16/9",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: "image",
      aspectRatio: "aspectRatio",
    },
    prepare(selection) {
      const { media, aspectRatio } = selection;
      return {
        title: `Image (${aspectRatio})`,
        media: media,
      };
    },
  },
});
