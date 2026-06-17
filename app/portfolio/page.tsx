import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import {
  allCollectionsQuery,
  allCategoriesQuery,
} from "@/sanity/lib/queries";
import type { CollectionSummary, Category } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { BentoGallery } from "@/components/portfolio/bento-gallery";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export const metadata = {
  title: "Portfolio",
  description: "Selected photography work across weddings, portraits, commercial, and lifestyle.",
};

export default async function PortfolioIndexPage() {
  let collections: CollectionSummary[] = [];
  let categories: Category[] = [];

  try {
    [collections, categories] = await Promise.all([
      sanityFetch<CollectionSummary[]>({
        query: allCollectionsQuery,
        tags: ["collection"],
      }),
      sanityFetch<Category[]>({
        query: allCategoriesQuery,
        tags: ["category"],
      }),
    ]);
  } catch {}

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bone via-bone-soft to-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
        >
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-dawn/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Portfolio
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Every image,
            <br />
            a held moment.
          </TextReveal>
        </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-y border-ink/10 bg-bone-soft">
          <div className="mx-auto max-w-[1800px] px-6 py-6 lg:px-12">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                Filter by
              </span>
              <Link
                href="/portfolio"
                className="font-serif text-lg text-ink hover:text-gold"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/portfolio/category/${cat.slug.current}`}
                  className="font-serif text-lg text-ink/70 transition-colors hover:text-gold"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-12 lg:py-32">
        {collections.length > 0 ? (
          <BentoGallery collections={collections} />
        ) : (
          <EmptyState message="Collections will appear here once published in the studio." />
        )}
      </section>
    </>
  );
}