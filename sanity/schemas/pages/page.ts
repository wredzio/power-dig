import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  type: "document",
  title: "Strona",
  icon: DocumentIcon,
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
      title: "Tytuł strony",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2025-08-07" });
          const id = document?._id.replace(/^drafts\./, "");
          const language = (document as { language?: string })?.language;
          const params = { slug, id, language };
          const query = `!defined(*[
            _type == "page" &&
            slug.current == $slug &&
            language == $language &&
            !(_id in [$id, "drafts." + $id])
          ][0]._id)`;
          return await client.fetch(query, params);
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metadata",
      type: "object",
      title: "Metadata SEO",
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "Meta Tytuł",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          title: "Meta Opis",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "keywords",
          type: "array",
          title: "Słowa kluczowe",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
        defineField({
          name: "ogImage",
          type: "image",
          title: "Open Graph Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Tekst alternatywny",
            }),
          ],
        }),
        defineField({
          name: "noIndex",
          type: "boolean",
          title: "No Index",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Sekcje",
      of: [
        { type: "heroSection" },
        { type: "servicesSection" },
        { type: "aboutSection" },
        { type: "miniExcavatorSection" },
        { type: "certificatesSection" },
        { type: "gallerySection" },
        { type: "faqSection" },
        { type: "contactSection" },
        { type: "imageSection" },
        { type: "subheadingSection" },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title || "Bez tytułu",
        subtitle: slug ? `/${slug}` : "Brak sluga",
      };
    },
  },
});
