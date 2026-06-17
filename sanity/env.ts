/**
 * Domus Loucis — Sanity Environment Configuration
 *
 * Replace these placeholders with your real Sanity project credentials.
 * For local dev, copy this file to `.env.local` and fill in values.
 *
 * How to create a project:
 *   1. cd sanity && npx sanity init --env
 *   2. Or create one at https://www.sanity.io/manage
 *   3. Add the project ID + dataset below
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published" as const,
} as const;