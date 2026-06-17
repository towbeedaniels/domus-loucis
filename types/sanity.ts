import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logo?: SanityImageSource;
  monogram?: SanityImageSource;
  favicon?: SanityImageSource;
  heroVideo?: { asset: { _ref: string } };
  heroPoster?: SanityImageSource;
  ambientImage?: SanityImageSource;
  ambientPosition?: "center" | "top" | "bottom";
  contactEmail?: string;
  contactPhone?: string;
  studioAddress?: string;
  socialLinks?: { platform: string; url: string }[];
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
  footerNote?: string;
}

export interface Photographer {
  name: string;
  portrait?: SanityImageSource;
  bio?: unknown[];
  mission?: string;
  quote?: string;
  credentials?: string[];
}

export interface Category {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  coverImage?: SanityImageSource;
}

export interface CollectionSummary {
  _id: string;
  title: string;
  slug: SanitySlug;
  category?: { title: string; slug: SanitySlug };
  coverImage: SanityImageSource;
  excerpt?: string;
  client?: string;
  location?: string;
  date?: string;
  featured?: boolean;
}

export interface PhotoDetail {
  _id: string;
  title?: string;
  alt: string;
  caption?: unknown[];
  image: SanityImageSource;
  exif?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    iso?: number;
    shutter?: string;
    aperture?: string;
  };
  dateCaptured?: string;
  location?: { city?: string; country?: string };
}

export interface CollectionDetail extends CollectionSummary {
  story?: unknown[];
  testimonial?: {
    clientName: string;
    quote: string;
    clientPhoto?: SanityImageSource;
  };
  photos?: PhotoDetail[];
  relatedCollections?: CollectionSummary[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}

export interface Service {
  _id: string;
  title: string;
  slug: SanitySlug;
  tagline?: string;
  description?: unknown[];
  priceFrom?: number;
  priceCurrency?: string;
  duration?: string;
  deliverables?: string[];
  addOns?: string[];
  featuredImage?: SanityImageSource;
  featured?: boolean;
  category?: { title: string; slug: SanitySlug };
}

export interface JournalPostSummary {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: SanityImageSource;
  publishedAt: string;
  categories?: string[];
}

export interface JournalPostDetail extends JournalPostSummary {
  body?: unknown[];
  author?: { name: string; portrait?: SanityImageSource };
  relatedPosts?: JournalPostSummary[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
}

export interface PressFeature {
  _id: string;
  publication: string;
  publicationLogo?: SanityImageSource;
  headline?: string;
  url?: string;
  date?: string;
  coverImage?: SanityImageSource;
  excerpt?: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  useInitials?: boolean;
  quote: string;
  clientPhoto?: SanityImageSource;
  eventType?: string;
  date?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: unknown[];
  category: string;
}

export interface ProductPackage {
  _id: string;
  title: string;
  slug: SanitySlug;
  productType: "print" | "digital" | "bundle" | "giftCard";
  description?: string;
  basePrice: number;
  currency: string;
  previewImage?: SanityImageSource;
  variants?: { label: string; priceModifier: number; sku?: string; stock?: number }[];
  linkedPhoto?: { title?: string; alt: string; image: SanityImageSource };
}