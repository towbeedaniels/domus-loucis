import { defineType, defineField } from "sanity";

export const photographer = defineType({
  name: "photographer",
  title: "Photographer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "mission",
      type: "text",
      rows: 4,
      description: "A short mission or artist statement.",
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 2,
      description: "Pull quote — displayed prominently on About.",
    }),
    defineField({
      name: "credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "Awards, publications, certifications.",
    }),
  ],
  preview: {
    select: { title: "name", media: "portrait" },
  },
});