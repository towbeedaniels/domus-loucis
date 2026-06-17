import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { allCollectionsQuery, allJournalPostsQuery } from "@/sanity/lib/queries";
import type { CollectionSummary, JournalPostSummary } from "@/types/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://domusloucis.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/portfolio",
    "/services",
    "/journal",
    "/press",
    "/faq",
    "/contact",
    "/shop",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  let collections: CollectionSummary[] = [];
  let posts: JournalPostSummary[] = [];
  try {
    [collections, posts] = await Promise.all([
      sanityFetch<CollectionSummary[]>({
        query: allCollectionsQuery,
        tags: ["collection"],
      }),
      sanityFetch<JournalPostSummary[]>({
        query: allJournalPostsQuery,
        tags: ["journalPost"],
      }),
    ]);
  } catch {}

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${baseUrl}/portfolio/${c.slug.current}`,
    lastModified: c.date ? new Date(c.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/journal/${p.slug.current}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...postRoutes];
}