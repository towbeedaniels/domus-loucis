import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import {
  pressFeaturesQuery,
  featuredTestimonialsQuery,
} from "@/sanity/lib/queries";
import type { PressFeature, Testimonial } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export const metadata = {
  title: "Press & Features",
  description: "Recognized in publications and loved by clients.",
};

export default async function PressPage() {
  let features: PressFeature[] = [];
  let testimonials: Testimonial[] = [];
  try {
    [features, testimonials] = await Promise.all([
      sanityFetch<PressFeature[]>({
        query: pressFeaturesQuery,
        tags: ["pressFeature"],
      }),
      sanityFetch<Testimonial[]>({
        query: featuredTestimonialsQuery,
        tags: ["testimonial"],
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
          <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-rose/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Press & Recognition
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            In print,
            <br />
            in pixels.
          </TextReveal>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-12 lg:py-32">
        <FadeIn className="mb-12">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
            Publications
          </p>
        </FadeIn>

        {features.length > 0 ? (
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {features.map((feature) => (
              <Link
                key={feature._id}
                href={feature.url || "#"}
                target={feature.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group grid grid-cols-12 items-center gap-6 py-8 transition-colors hover:bg-bone-soft lg:py-10"
              >
                <div className="col-span-12 lg:col-span-3">
                  {feature.publicationLogo && (
                    <Image
                      src={imageUrl(feature.publicationLogo, {
                        width: 400,
                        quality: 90,
                        auto: "format",
                      })}
                      alt={feature.publication}
                      width={400}
                      height={200}
                      className="h-12 w-auto object-contain grayscale transition-all group-hover:grayscale-0"
                    />
                  )}
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <h2 className="font-serif text-2xl leading-tight transition-colors group-hover:text-gold lg:text-3xl">
                    {feature.headline || feature.excerpt || feature.publication}
                  </h2>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-taupe">
                    {feature.publication}
                  </p>
                </div>
                <div className="col-span-12 text-right lg:col-span-2">
                  {feature.date && (
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-ink/60">
                      {new Date(feature.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="Press features will appear here once published." />
        )}
      </section>

      {testimonials.length > 0 && (
        <section className="bg-ink py-32 text-bone lg:py-48">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
            <FadeIn className="mb-20">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
                Testimonials
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {testimonials.map((t, i) => (
                <FadeIn key={t._id} delay={i * 0.1}>
                  <blockquote className="font-serif text-2xl italic leading-snug lg:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
                    — {t.useInitials
                      ? t.clientName
                          .split(" ")
                          .map((p) => p[0])
                          .join(".")
                      : t.clientName}
                    {t.eventType && ` · ${t.eventType}`}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}