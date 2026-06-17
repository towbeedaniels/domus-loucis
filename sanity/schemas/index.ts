import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { photographer } from "./photographer";
import { photo } from "./photo";
import { collection } from "./collection";
import { category } from "./category";
import { service } from "./service";
import { productPackage } from "./package";
import { journalPost } from "./journalPost";
import { pressFeature } from "./pressFeature";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  siteSettings,
  photographer,
  // Documents
  photo,
  collection,
  category,
  service,
  productPackage,
  journalPost,
  pressFeature,
  testimonial,
  faqItem,
];