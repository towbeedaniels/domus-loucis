import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { journalPostBySlugQuery } from "@/sanity/lib/queries";
import type { JournalPostDetail } from "@/types/sanity";
import { FadeIn } from "@/components/motion/text-reveal";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await sanityFetch<JournalPostDetail | null>({
      query: journalPostBySlugQuery,
      params: { slug },
      tags: ["journalPost"],
    });
    if (!post) return { title: "Journal" };
    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: post.coverImage
        ? {
            images: [
              {
                url: imageUrl(post.coverImage, {
                  width: 1200,
                  height: 630,
                  auto: "format",
                }),
              },
            ],
          }
        : undefined,
    };
  } catch {
    return { title: "Journal" };
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: JournalPostDetail | null = null;
  try {
    post = await sanityFetch<JournalPostDetail | null>({
      query: journalPostBySlugQuery,
      params: { slug },
      tags: ["journalPost"],
    });
  } catch {}

  if (!post) notFound();

  return (
    <article className="bg-bone">
      <header className="pt-40 pb-16 lg:pt-56 lg:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe"
            >
              <span aria-hidden>←</span>
              <span>All Posts</span>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-12 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
              {formatDate(post.publishedAt)}
              {post.categories?.[0] && ` · ${post.categories[0]}`}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mt-6 font-serif text-5xl leading-[0.95] lg:text-8xl">
              {post.title}
            </h1>
          </FadeIn>
          {post.excerpt && (
            <FadeIn delay={0.3} className="mt-8 max-w-2xl">
              <p className="font-serif text-2xl italic leading-relaxed text-ink/70">
                {post.excerpt}
              </p>
            </FadeIn>
          )}
        </div>
      </header>

      {post.coverImage && (
        <FadeIn>
          <div className="mx-auto aspect-[16/9] w-full max-w-[1800px] overflow-hidden bg-mist">
            <Image
              src={imageUrl(post.coverImage, {
                width: 2400,
                quality: 90,
                auto: "format",
              })}
              alt={post.title}
              width={2400}
              height={1350}
              className="h-full w-full object-cover"
            />
          </div>
        </FadeIn>
      )}

      <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
        <div className="prose prose-lg max-w-none font-serif text-xl leading-relaxed text-ink/80">
          <PortableText value={(post.body as never[]) || []} />
        </div>
      </section>

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="border-t border-ink/10 bg-bone-soft py-24">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Continue reading
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {post.relatedPosts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/journal/${rel.slug.current}`}
                  className="group"
                >
                  {rel.coverImage && (
                    <div className="aspect-[4/5] overflow-hidden bg-mist">
                      <Image
                        src={imageUrl(rel.coverImage, {
                          width: 800,
                          quality: 85,
                          auto: "format",
                        })}
                        alt={rel.title}
                        width={800}
                        height={1000}
                        className="h-full w-full object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="mt-4 font-serif text-2xl transition-colors group-hover:text-gold">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}