import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { allJournalPostsQuery } from "@/sanity/lib/queries";
import type { JournalPostSummary } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export const metadata = {
  title: "Journal",
  description: "Notes, reflections, and behind-the-scenes from the studio.",
};

export default async function JournalIndexPage() {
  let posts: JournalPostSummary[] = [];
  try {
    posts = await sanityFetch<JournalPostSummary[]>({
      query: allJournalPostsQuery,
      tags: ["journalPost"],
    });
  } catch {}

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bone via-bone-soft to-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
        >
          <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-dawn/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Journal
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Notes from
            <br />
            the studio.
          </TextReveal>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-12 lg:py-32">
        {posts.length > 0 ? (
          <div className="space-y-24">
            {posts.map((post, i) => (
              <FadeIn key={post._id}>
                <Link
                  href={`/journal/${post.slug.current}`}
                  className={`group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {post.coverImage && (
                    <div
                      className={`overflow-hidden bg-mist lg:col-span-7 ${
                        i % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="aspect-[4/3] w-full">
                        <Image
                          src={imageUrl(post.coverImage, {
                            width: 1600,
                            quality: 85,
                            auto: "format",
                          })}
                          alt={post.title}
                          width={1600}
                          height={1200}
                          className="h-full w-full object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex flex-col justify-center lg:col-span-5 ${
                      i % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {post.categories?.[0] && ` · ${post.categories[0]}`}
                    </p>
                    <h2 className="mt-6 font-serif text-4xl leading-[0.95] transition-colors group-hover:text-gold lg:text-6xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-6 font-serif text-xl italic leading-relaxed text-ink/70">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-8 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-ink">
                      <span className="h-px w-8 bg-ink transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                      Read
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState message="Journal entries will appear here once published in the studio." />
        )}
      </section>
    </>
  );
}