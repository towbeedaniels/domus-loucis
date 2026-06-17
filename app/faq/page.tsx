import { sanityFetch } from "@/sanity/lib/client";
import { allFaqQuery } from "@/sanity/lib/queries";
import type { FaqItem } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export const metadata = {
  title: "FAQ",
  description: "Common questions about commissioning photography.",
};

export default async function FaqPage() {
  let items: FaqItem[] = [];
  try {
    items = await sanityFetch<FaqItem[]>({
      query: allFaqQuery,
      tags: ["faqItem"],
    });
  } catch {}

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bone via-bone-soft to-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
        >
          <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-dusk/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              FAQ
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Questions,
            <br />
            answered.
          </TextReveal>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12 lg:py-32">
        {items.length > 0 ? (
          <FaqAccordion items={items} />
        ) : (
          <EmptyState message="FAQ entries will appear here once published." />
        )}
      </section>
    </>
  );
}