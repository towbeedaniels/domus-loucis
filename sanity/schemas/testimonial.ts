import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "useInitials",
      type: "boolean",
      initialValue: false,
      description: "Show only initials (for privacy).",
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "clientPhoto",
      type: "image",
    }),
    defineField({
      name: "eventType",
      type: "string",
    }),
    defineField({
      name: "date",
      type: "date",
    }),
    defineField({
      name: "linkedCollection",
      type: "reference",
      to: [{ type: "collection" }],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "quote", media: "clientPhoto" },
  },
});