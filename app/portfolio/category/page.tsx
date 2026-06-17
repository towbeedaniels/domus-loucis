import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import {
  allCategoriesQuery,
  collectionsByCategoryQuery,
} from "@/sanity/lib/queries";
import type { CollectionSummary, Category } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { BentoGallery } from "@/components/portfolio/bento-gallery";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  try {
    const categories = await sanityFetch<Category[]>({
      query: allCategoriesQuery,
      tags: ["category"],
    });
    const category = categories.find((c) => c.slug.current === categorySlug);
    return {
      title: category?.title || "Category",
      description: category?.description || "",
    };
  } catch {
    return { title: "Category" };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  let categories: Category[] = [];
  let collections: CollectionSummary[] = [];

  try {
    [categories, collections] = await Promise.all([
      sanityFetch<Category[]>({
        query: allCategoriesQuery,
        tags: ["category"],
      }),
      sanityFetch<CollectionSummary[]>({
        query: collectionsByCategoryQuery,
        params: { categorySlug },
        tags: ["collection"],
      }),
    ]);
  } catch {}

  const category = categories.find((c) => c.slug.current === categorySlug);
  if (!category) notFound();

  return (
    <>
      <section className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe"
            >
              <span aria-hidden>←</span>
              <span>All Work</span>
            </Link>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-8 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            {category.title}.
          </TextReveal>
          {category.description && (
            <FadeIn className="mt-10 max-w-2xl" delay={0.4}>
              <p className="font-serif text-2xl italic leading-relaxed text-ink/70">
                {category.description}
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-12 lg:py-32">
        {collections.length > 0 ? (
          <BentoGallery collections={collections} />
        ) : (
          <EmptyState message={`No ${category.title.toLowerCase()} collections published yet.`} />
        )}
      </section>
    </>
  );
}