import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { imageUrl } from "@/sanity/lib/image";

export type LegalSection = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
};

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated: string;
  sections: LegalSection[];
  backdropSrc?: string;
  backdropImage?: SanityImageSource;
  contactEmail?: string;
};

export function LegalLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  backdropSrc,
  backdropImage,
  contactEmail = "hello@domusloucis.com",
}: LegalLayoutProps) {
  const resolvedBackdrop = backdropImage
    ? imageUrl(backdropImage, { width: 2400, quality: 80, auto: "format" })
    : backdropSrc;

  return (
    <>
      <AmbientBackdrop
        src={resolvedBackdrop}
        alt=""
        opacity={0.09}
        position="center"
        overlayTint="warm"
        className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              {eyebrow}
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            {title}
          </TextReveal>
          {intro && (
            <FadeIn delay={0.3} className="mt-12 max-w-2xl">
              <p className="font-serif text-2xl italic leading-relaxed text-ink/70">
                {intro}
              </p>
            </FadeIn>
          )}
          <FadeIn delay={0.5} className="mt-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
              Last updated · {lastUpdated}
            </p>
          </FadeIn>
        </div>
      </AmbientBackdrop>

      <section className="bg-bone pb-32 lg:pb-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="space-y-24">
            {sections.map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.04}>
                <article className="grid grid-cols-1 gap-6 border-t border-gold/30 pt-10 lg:grid-cols-12 lg:gap-12">
                  <header className="lg:col-span-4">
                    {section.eyebrow && (
                      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                        {section.eyebrow}
                      </p>
                    )}
                    <h2 className="mt-3 font-serif text-3xl leading-tight lg:text-4xl">
                      {section.title}
                    </h2>
                  </header>
                  <div className="space-y-5 font-serif text-lg leading-relaxed text-ink/80 lg:col-span-8">
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-32 border-t border-gold/30 pt-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
              A note
            </p>
            <p className="mt-6 font-serif text-2xl italic leading-relaxed text-ink/80 lg:text-3xl">
              Questions about any of this, or simply want to talk it through?
              Write to me at{" "}
              <Link
                href={`mailto:${contactEmail}`}
                className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                {contactEmail}
              </Link>{" "}
              — I read every message myself.
            </p>
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-ink"
            >
              <span className="h-px w-12 bg-ink transition-all duration-500 group-hover:w-20" />
              Back to inquire
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}