import { defineType, defineField } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal Post",
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
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "photographer" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        {
          type: "object",
          name: "imageGrid",
          title: "Image Grid",
          fields: [
            {
              name: "images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            },
            {
              name: "columns",
              type: "number",
              options: { list: [2, 3, 4] },
              initialValue: 2,
            },
          ],
        },
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [{ name: "quote", type: "text", rows: 3 }],
        },
      ],
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "journalPost" }] }],
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
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare: ({ title, media, date }) => ({
      title,
      media,
      subtitle: date ? new Date(date).toLocaleDateString() : "",
    }),
  },
  orderings: [
    {
      title: "Published, Newest First",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});