import { defineType, defineField } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true, metadata: ["exif", "location", "palette"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Required for accessibility. Describe the image meaningfully.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "exif",
      title: "EXIF",
      type: "object",
      fields: [
        { name: "camera", type: "string", title: "Camera" },
        { name: "lens", type: "string", title: "Lens" },
        { name: "focalLength", type: "string", title: "Focal Length" },
        { name: "iso", type: "number", title: "ISO" },
        { name: "shutter", type: "string", title: "Shutter" },
        { name: "aperture", type: "string", title: "Aperture" },
      ],
    }),
    defineField({
      name: "dateCaptured",
      type: "datetime",
    }),
    defineField({
      name: "location",
      type: "object",
      fields: [
        { name: "city", type: "string" },
        { name: "country", type: "string" },
      ],
    }),
    defineField({
      name: "collections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
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
      description: "Manual sort order within collections.",
    }),
    defineField({
      name: "availableForPrint",
      title: "Available for Print",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      alt: "alt",
      media: "image",
    },
    prepare: ({ title, alt, media }) => ({
      title: title || alt || "Untitled",
      media,
    }),
  },
});