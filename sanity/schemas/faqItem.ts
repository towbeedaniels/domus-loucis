import { defineType, defineField } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Booking", value: "booking" },
          { title: "Pricing", value: "pricing" },
          { title: "Process", value: "process" },
          { title: "Deliverables", value: "deliverables" },
          { title: "General", value: "general" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});