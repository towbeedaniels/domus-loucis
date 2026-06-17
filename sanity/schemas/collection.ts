import { defineType, defineField } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "story",
      title: "Story (portable text)",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "photos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "photo" }] }],
    }),
    defineField({
      name: "client",
      type: "string",
      description: "Couple, person, or brand name (optional).",
    }),
    defineField({
      name: "location",
      type: "string",
    }),
    defineField({
      name: "date",
      type: "date",
    }),
    defineField({
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
    }),
    defineField({
      name: "visibility",
      type: "string",
      options: {
        list: [
          { title: "Public", value: "public" },
          { title: "Unlisted", value: "unlisted" },
          { title: "Password Protected", value: "password" },
          { title: "Private (Proofing)", value: "private" },
        ],
      },
      initialValue: "public",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: ({ document }) => document?.visibility !== "password",
    }),
    defineField({
      name: "relatedCollections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string" },
        { name: "metaDescription", type: "text", rows: 3 },
        { name: "ogImage", type: "image" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Date, Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Order (manual)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});