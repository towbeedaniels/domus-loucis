import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { BentoGallery } from "@/components/portfolio/bento-gallery";
import { Marquee } from "@/components/motion/marquee";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import {
  siteSettingsQuery,
  featuredCollectionsQuery,
  featuredServicesQuery,
  featuredTestimonialsQuery,
  featuredJournalPostsQuery,
} from "@/sanity/lib/queries";
import type {
  SiteSettings,
  CollectionSummary,
  Service,
  Testimonial,
  JournalPostSummary,
} from "@/types/sanity";

export const revalidate = 3600;

const MARQUEE_WORDS = [
  "Editorial",
  "Wedding",
  "Portrait",
  "Brand",
  "Lifestyle",
  "Fashion",
  "Intimate",
  "Natural",
];

export default async function HomePage() {
  let siteSettings: SiteSettings | null = null;
  let collections: CollectionSummary[] = [];
  let services: Service[] = [];
  let testimonials: Testimonial[] = [];
  let journalPosts: JournalPostSummary[] = [];

  try {
    [siteSettings, collections, services, testimonials, journalPosts] =
      await Promise.all([
        sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
        sanityFetch<CollectionSummary[]>({
          query: featuredCollectionsQuery,
          tags: ["collection"],
        }),
        sanityFetch<Service[]>({
          query: featuredServicesQuery,
          tags: ["service"],
        }),
        sanityFetch<Testimonial[]>({
          query: featuredTestimonialsQuery,
          tags: ["testimonial"],
        }),
        sanityFetch<JournalPostSummary[]>({
          query: featuredJournalPostsQuery,
          tags: ["journalPost"],
        }),
      ]);
  } catch {
    // Sanity not yet configured — render gracefully with empty data
  }

  const heroPoster = siteSettings?.heroPoster
    ? imageUrl(siteSettings.heroPoster, { width: 2400, quality: 85, auto: "format" })
    : siteSettings?.ambientImage
      ? imageUrl(siteSettings.ambientImage, { width: 2400, quality: 85, auto: "format" })
      : "/images/ambient/linen-light.jpg";

  return (
    <>
      <Hero
        title={["Photography", "rooted in", "light."]}
        tagline="House of Light"
        posterImage={heroPoster}
        posterAlt="Soft window light"
      />

      <section className="border-y border-ink/10 bg-bone py-8">
        <Marquee speed={40} className="font-serif text-4xl lg:text-6xl">
          {MARQUEE_WORDS.map((word, i) => (
            <span key={i} className="flex items-center gap-12 text-ink/70">
              {word}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="mx-auto max-w-[1800px] px-6 py-32 lg:px-12 lg:py-48">
        <FadeIn className="mb-16 flex flex-col items-start justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Selected Work
            </p>
            <TextReveal
              as="h2"
              className="mt-6 font-serif text-6xl leading-[0.95] lg:text-9xl"
            >
              Recent stories.
            </TextReveal>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-ink"
          >
            <span className="h-px w-12 bg-ink transition-all duration-500 group-hover:w-20" />
            View All Work
          </Link>
        </FadeIn>

        {collections.length > 0 ? (
          <BentoGallery collections={collections} />
        ) : (
          <EmptyState message="Featured collections will appear here once you publish them in the studio." />
        )}
      </section>

      {services.length > 0 && (
        <section className="relative border-y border-ink/10 bg-gradient-to-br from-bone-soft via-mist to-dawn/20 py-32 lg:py-48">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
            <FadeIn className="mb-20 max-w-3xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
                Services
              </p>
              <TextReveal
                as="h2"
                className="mt-6 font-serif text-5xl leading-[0.95] lg:text-7xl"
              >
                Tailored to your story.
              </TextReveal>
            </FadeIn>

            <div className="grid grid-cols-1 gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service, i) => (
                <FadeIn
                  key={service._id}
                  delay={i * 0.1}
                  className="group bg-bone-soft p-10 transition-colors duration-700 hover:bg-ink hover:text-bone"
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                    {service.category?.title || "Service"}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight lg:text-4xl">
                    {service.title}
                  </h3>
                  {service.tagline && (
                    <p className="mt-4 font-serif text-lg italic text-ink/70 transition-colors group-hover:text-bone/70">
                      {service.tagline}
                    </p>
                  )}
                  <div className="mt-8 flex items-end justify-between">
                    {service.priceFrom && (
                      <p className="font-sans text-xs uppercase tracking-[0.2em]">
                        From ${service.priceFrom.toLocaleString()}
                      </p>
                    )}
                    <Link
                      href="/services"
                      aria-label={`Learn more about ${service.title}`}
                      className="font-serif text-2xl"
                    >
                      →
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="bg-ink py-32 text-bone lg:py-48">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
            <FadeIn className="mb-20">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
                In Their Words
              </p>
              <TextReveal
                as="h2"
                className="mt-6 font-serif text-5xl leading-[0.95] lg:text-7xl"
              >
                Kind words.
              </TextReveal>
            </FadeIn>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <FadeIn
                  key={t._id}
                  delay={i * 0.15}
                  className="border-l-2 border-gold pl-8"
                >
                  <blockquote className="font-serif text-3xl leading-snug italic lg:text-4xl">
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

      {journalPosts.length > 0 && (
        <section className="mx-auto max-w-[1800px] px-6 py-32 lg:px-12 lg:py-48">
          <FadeIn className="mb-16 flex flex-col items-start justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
                Journal
              </p>
              <TextReveal
                as="h2"
                className="mt-6 font-serif text-5xl leading-[0.95] lg:text-7xl"
              >
                Notes from the studio.
              </TextReveal>
            </div>
            <Link
              href="/journal"
              className="group flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-ink"
            >
              <span className="h-px w-12 bg-ink transition-all duration-500 group-hover:w-20" />
              All Posts
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {journalPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post._id} delay={i * 0.1}>
                <Link href={`/journal/${post.slug.current}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-mist">
                    {post.coverImage && (
                      <Image
                        src={imageUrl(post.coverImage, {
                          width: 1200,
                          quality: 85,
                          auto: "format",
                        })}
                        alt={post.title}
                        width={1200}
                        height={1500}
                        className="h-full w-full object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight transition-colors group-hover:text-gold">
                    {post.title}
                  </h3>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-gradient-to-b from-bone via-bone-soft to-bone py-32 lg:py-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
        >
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-dawn/40 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-dusk/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Begin
            </p>
            <TextReveal
              as="h2"
              className="mt-8 font-serif text-6xl leading-[0.9] lg:text-9xl"
            >
              Tell me your story.
            </TextReveal>
            <p className="mx-auto mt-10 max-w-xl font-serif text-xl italic text-ink/70">
              I take on a limited number of commissions each year. If our work
              speaks to you, I&apos;d love to hear from you.
            </p>
            <div className="mt-14 flex justify-center">
              <MagneticButton href="/contact">
                Inquire
                <span aria-hidden>→</span>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-sm border border-dashed border-ink/20 bg-bone-soft/40 p-12 text-center">
      <p className="font-serif text-2xl italic text-ink/50">{message}</p>
      <p className="mt-3 font-sans text-xs uppercase tracking-[0.3em] text-ink/40">
        Manage content at /studio
      </p>
    </div>
  );
}