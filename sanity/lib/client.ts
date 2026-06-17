import { createClient } from "next-sanity";
import { sanityConfig } from "../env";

export const sanityClient = createClient(sanityConfig);

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 3600 : 0,
      tags,
    },
  });
}