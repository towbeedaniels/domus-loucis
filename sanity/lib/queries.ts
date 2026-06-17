/**
 * GROQ queries — Domus Loucis
 * All CMS-driven content flows through these queries.
 */

import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    logo,
    monogram,
    favicon,
    heroVideo,
    heroPoster,
    ambientImage{
      ...,
      asset->{ _id, url }
    },
    ambientPosition,
    contactEmail,
    contactPhone,
    studioAddress,
    socialLinks,
    defaultSeo,
    footerNote
  }
`;

export const photographerQuery = groq`
  *[_type == "photographer"][0]{
    name,
    portrait,
    bio,
    mission,
    quote,
    credentials
  }
`;

export const allCollectionsQuery = groq`
  *[_type == "collection" && visibility == "public"] | order(coalesce(order, 999) asc, date desc) {
    _id,
    title,
    slug,
    "category": category->{title, slug},
    coverImage,
    excerpt,
    client,
    location,
    date,
    featured
  }
`;

export const featuredCollectionsQuery = groq`
  *[_type == "collection" && visibility == "public" && featured == true] | order(coalesce(order, 999) asc, date desc)[0...6] {
    _id,
    title,
    slug,
    "category": category->{title, slug},
    coverImage,
    excerpt,
    location
  }
`;

export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "category": category->{title, slug},
    coverImage,
    excerpt,
    story,
    client,
    location,
    date,
    "testimonial": testimonial->{clientName, quote, clientPhoto},
    "photos": photos[]->{
      _id,
      title,
      alt,
      caption,
      image,
      exif,
      dateCaptured,
      "location": location
    } | order(coalesce(order, 999) asc),
    "relatedCollections": relatedCollections[]->{
      _id, title, slug, coverImage, "category": category->{title}
    },
    seo
  }
`;

export const collectionsByCategoryQuery = groq`
  *[_type == "collection" && category->slug.current == $categorySlug && visibility == "public"] | order(coalesce(order, 999) asc, date desc) {
    _id,
    title,
    slug,
    coverImage,
    excerpt,
    client,
    location,
    date
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(coalesce(order, 999) asc) {
    _id,
    title,
    slug,
    description,
    coverImage
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(coalesce(order, 999) asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    priceFrom,
    priceCurrency,
    duration,
    deliverables,
    addOns,
    featuredImage,
    featured,
    "category": category->{title, slug}
  }
`;

export const featuredServicesQuery = groq`
  *[_type == "service" && featured == true] | order(coalesce(order, 999) asc)[0...6] {
    _id,
    title,
    slug,
    tagline,
    priceFrom,
    priceCurrency,
    duration,
    featuredImage
  }
`;

export const allJournalPostsQuery = groq`
  *[_type == "journalPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    categories
  }
`;

export const journalPostBySlugQuery = groq`
  *[_type == "journalPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    categories,
    body,
    "author": author->{name, portrait},
    "relatedPosts": relatedPosts[]->{_id, title, slug, coverImage, excerpt},
    seo
  }
`;

export const featuredJournalPostsQuery = groq`
  *[_type == "journalPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
`;

export const pressFeaturesQuery = groq`
  *[_type == "pressFeature"] | order(coalesce(order, 999) asc, date desc) {
    _id,
    publication,
    publicationLogo,
    headline,
    url,
    date,
    coverImage,
    excerpt
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...6] {
    _id,
    clientName,
    useInitials,
    quote,
    clientPhoto,
    eventType,
    date
  }
`;

export const allFaqQuery = groq`
  *[_type == "faqItem"] | order(coalesce(order, 999) asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const allProductsQuery = groq`
  *[_type == "productPackage" && available == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    productType,
    description,
    basePrice,
    currency,
    previewImage,
    variants,
    "linkedPhoto": linkedPhoto->{title, alt, image}
  }
`;