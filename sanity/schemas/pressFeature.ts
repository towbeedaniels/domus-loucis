import { defineType, defineField } from "sanity";

export const pressFeature = defineType({
  name: "pressFeature",
  title: "Press Feature",
  type: "document",
  fields: [
    defineField({
      name: "publication",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publicationLogo",
      type: "image",
    }),
    defineField({
      name: "headline",
      type: "string",
    }),
    defineField({
      name: "url",
      type: "url",
    }),
    defineField({
      name: "date",
      type: "date",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      description: "Screenshot or magazine cover.",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "publication", subtitle: "headline", media: "publicationLogo" },
  },
});