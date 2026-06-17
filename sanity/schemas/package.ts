import { defineType, defineField } from "sanity";

export const productPackage = defineType({
  name: "productPackage",
  title: "Product / Package",
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
      name: "productType",
      type: "string",
      options: {
        list: [
          { title: "Print", value: "print" },
          { title: "Digital Download", value: "digital" },
          { title: "Bundle / Album", value: "bundle" },
          { title: "Gift Card", value: "giftCard" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "basePrice",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "currency",
      type: "string",
      initialValue: "USD",
    }),
    defineField({
      name: "variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Variant label" },
            { name: "priceModifier", type: "number", title: "Price modifier" },
            { name: "sku", type: "string", title: "SKU" },
            { name: "stock", type: "number", title: "Stock" },
          ],
        },
      ],
    }),
    defineField({
      name: "previewImage",
      type: "image",
      description: "Watermarked preview shown in shop.",
    }),
    defineField({
      name: "linkedPhoto",
      type: "reference",
      to: [{ type: "photo" }],
      description: "The photo this product is based on (for prints).",
    }),
    defineField({
      name: "stripeProductId",
      type: "string",
      description: "Synced from Stripe dashboard.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "available",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "productType", media: "previewImage" },
  },
});