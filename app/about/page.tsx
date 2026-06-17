import Image from "next/image";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import {
  photographerQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type { Photographer, SiteSettings } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";

export const revalidate = 3600;

export const metadata = {
  title: "Studio",
  description: "Meet the photographer behind Domus Loucis — a house of light.",
};

export default async function AboutPage() {
  let photographer: Photographer | null = null;
  let siteSettings: SiteSettings | null = null;
  try {
    [photographer, siteSettings] = await Promise.all([
      sanityFetch<Photographer | null>({
        query: photographerQuery,
        tags: ["photographer"],
      }),
      sanityFetch<SiteSettings | null>({
        query: siteSettingsQuery,
        tags: ["siteSettings"],
      }),
    ]);
  } catch {}

  const ambientSrc = siteSettings?.ambientImage
    ? imageUrl(siteSettings.ambientImage, { width: 2400, quality: 80, auto: "format" })
    : "/images/ambient/cream-room.jpg";
  const ambientPosition = siteSettings?.ambientPosition ?? "center";

  return (
    <>
      <section className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              The Studio
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Behind
            <br />
            the lens.
          </TextReveal>
        </div>
      </section>

      {photographer?.portrait && (
        <section className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn className="aspect-[4/5] w-full max-w-3xl overflow-hidden bg-mist md:aspect-[16/9]">
            <Image
              src={imageUrl(photographer.portrait, {
                width: 2000,
                quality: 90,
                auto: "format",
              })}
              alt={photographer.name || "The photographer"}
              width={2000}
              height={1125}
              className="h-full w-full object-cover"
            />
          </FadeIn>
        </section>
      )}

      <AmbientBackdrop
        src={ambientSrc}
        alt=""
        opacity={0.08}
        position={ambientPosition}
        overlayTint="warm"
        className="py-24 lg:py-32"
      >
        <section className="mx-auto grid max-w-[1800px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
                Hello
              </p>
              <h2 className="mt-6 font-serif text-5xl leading-[0.95] lg:text-6xl">
                I&apos;m {photographer?.name || "the photographer"}.
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            {photographer?.bio && (
              <FadeIn delay={0.2} className="prose prose-lg max-w-none font-serif text-xl leading-relaxed text-ink/80">
                <PortableText value={photographer.bio as never[]} />
              </FadeIn>
            )}
            {photographer?.mission && (
              <FadeIn delay={0.4} className="mt-12 border-l-2 border-gold pl-8 font-serif text-2xl italic leading-relaxed text-ink/70">
                {photographer.mission}
              </FadeIn>
            )}
          </div>
        </section>
      </AmbientBackdrop>

      {photographer?.quote && (
        <section className="bg-ink py-32 text-bone lg:py-48">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
            <FadeIn>
              <span className="font-serif text-7xl text-gold">&ldquo;</span>
              <blockquote className="mt-4 font-serif text-4xl italic leading-snug lg:text-6xl">
                {photographer.quote}
              </blockquote>
            </FadeIn>
          </div>
        </section>
      )}

      {photographer?.credentials && photographer.credentials.length > 0 && (
        <section className="mx-auto max-w-[1800px] px-6 py-24 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
                Recognized by
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 lg:col-span-8 lg:grid-cols-2">
              {photographer.credentials.map((cred, i) => (
                <FadeIn
                  key={i}
                  delay={i * 0.05}
                  className="border-b border-ink/10 pb-4 font-serif text-2xl"
                >
                  {cred}
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}