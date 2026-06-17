import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { collectionBySlugQuery } from "@/sanity/lib/queries";
import type { CollectionDetail } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { Gallery } from "@/components/gallery/gallery";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const collection = await sanityFetch<CollectionDetail | null>({
      query: collectionBySlugQuery,
      params: { slug },
      tags: ["collection"],
    });
    if (!collection) return { title: "Collection" };
    return {
      title: collection.title,
      description: collection.excerpt || `${collection.title} — Domus Loucis`,
      openGraph: collection.coverImage
        ? {
            images: [
              {
                url: imageUrl(collection.coverImage, {
                  width: 1200,
                  height: 630,
                  auto: "format",
                }),
                width: 1200,
                height: 630,
                alt: collection.title,
              },
            ],
          }
        : undefined,
    };
  } catch {
    return { title: "Collection" };
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let collection: CollectionDetail | null = null;
  try {
    collection = await sanityFetch<CollectionDetail | null>({
      query: collectionBySlugQuery,
      params: { slug },
      tags: ["collection"],
    });
  } catch {}

  if (!collection) notFound();

  const heroSrc = imageUrl(collection.coverImage, {
    width: 2400,
    quality: 90,
    auto: "format",
  });

  return (
    <article className="bg-bone">
      {/* Hero */}
      <section className="relative h-[80svh] min-h-[600px] w-full overflow-hidden bg-ink">
        <Image
          src={heroSrc}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
        <div className="relative z-10 flex h-full flex-col justify-end p-8 text-bone lg:p-16">
          <FadeIn>
            {collection.category && (
              <Link
                href={`/portfolio/category/${collection.category.slug.current}`}
                className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold"
              >
                {collection.category.title}
              </Link>
            )}
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-4 font-serif text-7xl leading-[0.9] lg:text-[10rem]"
          >
            {collection.title}
          </TextReveal>
          <FadeIn delay={0.6} className="mt-8 flex flex-wrap gap-8 font-sans text-xs uppercase tracking-[0.3em] text-bone/80">
            {collection.client && <span>{collection.client}</span>}
            {collection.location && <span>{collection.location}</span>}
            {collection.date && (
              <span>
                {new Date(collection.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      {collection.story && (
        <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              The Story
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="prose prose-lg mt-8 font-serif text-xl leading-relaxed text-ink/80">
            <PortableText value={collection.story as never[]} />
          </FadeIn>
        </section>
      )}

      {/* Gallery */}
      {collection.photos && collection.photos.length > 0 && (
        <section className="mx-auto max-w-[1800px] px-4 py-12 lg:px-8 lg:py-20">
          <Gallery photos={collection.photos} />
        </section>
      )}

      {/* Testimonial */}
      {collection.testimonial && (
        <section className="bg-ink py-32 text-bone lg:py-48">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
            <FadeIn>
              <span className="font-serif text-7xl text-gold">"</span>
              <blockquote className="mt-4 font-serif text-3xl italic leading-snug lg:text-5xl">
                {collection.testimonial.quote}
              </blockquote>
              <p className="mt-10 font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
                — {collection.testimonial.clientName}
              </p>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Related */}
      {collection.relatedCollections && collection.relatedCollections.length > 0 && (
        <section className="mx-auto max-w-[1800px] px-6 py-24 lg:px-12 lg:py-32">
          <FadeIn className="mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Continue
            </p>
            <h2 className="mt-4 font-serif text-4xl lg:text-6xl">
              More stories.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {collection.relatedCollections.map((rel) => (
              <Link
                key={rel._id}
                href={`/portfolio/${rel.slug.current}`}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src={imageUrl(rel.coverImage, {
                      width: 1000,
                      quality: 85,
                      auto: "format",
                    })}
                    alt={rel.title}
                    width={1000}
                    height={1250}
                    className="h-full w-full object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-serif text-2xl transition-colors group-hover:text-gold">
                  {rel.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}