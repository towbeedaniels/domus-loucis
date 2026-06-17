import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
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
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "priceFrom",
      type: "number",
      description: "Starting price (display only, no checkout).",
    }),
    defineField({
      name: "priceCurrency",
      type: "string",
      initialValue: "USD",
    }),
    defineField({
      name: "duration",
      type: "string",
      description: "e.g. 'Full day', '6 hours', '2 hours'.",
    }),
    defineField({
      name: "deliverables",
      type: "array",
      of: [{ type: "string" }],
      description: "What's included.",
    }),
    defineField({
      name: "addOns",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "featuredImage" },
  },
});