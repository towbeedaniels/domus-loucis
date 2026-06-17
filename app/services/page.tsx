import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import {
  allServicesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import type { Service, SiteSettings } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { EmptyState } from "@/components/ui/empty-state";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";

export const revalidate = 3600;

export const metadata = {
  title: "Services",
  description: "Tailored photography services — weddings, portraits, commercial, and lifestyle.",
};

export default async function ServicesPage() {
  let services: Service[] = [];
  let siteSettings: SiteSettings | null = null;
  try {
    [services, siteSettings] = await Promise.all([
      sanityFetch<Service[]>({
        query: allServicesQuery,
        tags: ["service"],
      }),
      sanityFetch<SiteSettings | null>({
        query: siteSettingsQuery,
        tags: ["siteSettings"],
      }),
    ]);
  } catch {}

  const ambientSrc = siteSettings?.ambientImage
    ? imageUrl(siteSettings.ambientImage, { width: 2400, quality: 80, auto: "format" })
    : "/images/ambient/linen-light.jpg";
  const ambientPosition = siteSettings?.ambientPosition ?? "center";

  return (
    <>
      <section className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Services
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Tailored
            <br />
            to you.
          </TextReveal>
          <FadeIn delay={0.3} className="mt-12 max-w-2xl">
            <p className="font-serif text-2xl italic leading-relaxed text-ink/70">
              Every commission is shaped around your story. Below are starting
              points — final scopes are always tailored.
            </p>
          </FadeIn>
        </div>
      </section>

      <AmbientBackdrop
        src={ambientSrc}
        alt=""
        opacity={0.07}
        position={ambientPosition}
        overlayTint="warm"
        className="py-12 lg:py-20"
      >
        <section className="mx-auto max-w-[1800px] px-6 lg:px-12">
          {services.length > 0 ? (
          <div className="space-y-px bg-ink/10">
            {services.map((service, i) => (
              <FadeIn key={service._id} delay={i * 0.05}>
                <article className="group grid grid-cols-1 gap-8 bg-bone p-8 transition-colors duration-700 hover:bg-ink hover:text-bone lg:grid-cols-12 lg:p-16">
                  <div className="lg:col-span-2">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-taupe transition-colors group-hover:text-bone/60">
                      {service.category?.title || "Service"}
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <h2 className="font-serif text-4xl leading-[0.95] lg:text-6xl">
                      {service.title}
                    </h2>
                    {service.tagline && (
                      <p className="mt-4 font-serif text-xl italic text-ink/70 transition-colors group-hover:text-bone/70">
                        {service.tagline}
                      </p>
                    )}
                    {service.description && (
                      <div className="prose prose-lg mt-6 max-w-none font-serif text-base leading-relaxed text-ink/80 transition-colors group-hover:text-bone/80">
                        <PortableText value={service.description as never[]} />
                      </div>
                    )}
                    {(service.deliverables?.length || 0) > 0 && (
                      <ul className="mt-8 space-y-2">
                        {service.deliverables?.map((d, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 font-sans text-sm"
                          >
                            <span className="mt-2 h-px w-4 bg-gold" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-between gap-6 lg:col-span-4 lg:items-end">
                    {service.featuredImage && (
                      <div className="aspect-[4/5] w-full max-w-xs overflow-hidden bg-mist lg:max-w-none">
                        <Image
                          src={imageUrl(service.featuredImage, {
                            width: 1000,
                            quality: 85,
                            auto: "format",
                          })}
                          alt={service.title}
                          width={1000}
                          height={1250}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-left lg:text-right">
                      {service.priceFrom && (
                        <p className="font-serif text-4xl">
                          ${service.priceFrom.toLocaleString()}
                          <span className="ml-2 font-sans text-xs uppercase tracking-[0.2em] text-taupe transition-colors group-hover:text-bone/60">
                            from
                          </span>
                        </p>
                      )}
                      {service.duration && (
                        <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-taupe transition-colors group-hover:text-bone/60">
                          {service.duration}
                        </p>
                      )}
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors group-hover:text-gold"
                      >
                        Inquire <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState message="Services will appear here once published in the studio." />
        )}
        </section>
      </AmbientBackdrop>

      <section className="relative overflow-hidden bg-gradient-to-br from-dusk/30 via-bone-soft to-clay/10 py-32 lg:py-48">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Ready
            </p>
            <h2 className="mt-8 font-serif text-5xl leading-[0.9] lg:text-7xl">
              Let&apos;s begin.
            </h2>
            <div className="mt-12 flex justify-center">
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