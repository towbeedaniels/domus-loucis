import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Domus Loucis",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "House of Light",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "monogram",
      title: "Monogram Mark",
      type: "image",
      description: "Small 'DL' mark for favicons and tight spaces.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video (Home)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "heroPoster",
      title: "Hero Video Poster",
      type: "image",
      description: "Static poster shown while video loads.",
    }),
    defineField({
      name: "ambientImage",
      title: "Ambient Backdrop Image",
      type: "image",
      description:
        "Soft, low-opacity background used behind page headers and section backdrops. A warm, quiet photograph works best. Replaces the bundled placeholder when set.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ambientPosition",
      title: "Ambient Image Position",
      type: "string",
      description: "Where to anchor the ambient image within its frame.",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "studioAddress",
      title: "Studio Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description", rows: 3 },
        { name: "ogImage", type: "image", title: "Default OG Image" },
      ],
    }),
    defineField({
      name: "footerNote",
      title: "Footer Note",
      type: "string",
      initialValue: "Photography rooted in intimacy and light.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});