import { ContactForm } from "@/components/contact/contact-form";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

export const revalidate = 3600;

export const metadata = {
  title: "Contact",
  description: "Begin your story. Tell us about your commission.",
};

export default async function ContactPage() {
  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch {}

  const ambientSrc = siteSettings?.ambientImage
    ? imageUrl(siteSettings.ambientImage, { width: 2400, quality: 80, auto: "format" })
    : "/images/ambient/film-grain.jpg";
  const ambientPosition = siteSettings?.ambientPosition ?? "center";
  const contactEmail = siteSettings?.contactEmail || "hello@domusloucis.com";

  return (
    <>
      <section className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Inquire
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Begin
            <br />
            your story.
          </TextReveal>
        </div>
      </section>

      <AmbientBackdrop
        src={ambientSrc}
        alt=""
        opacity={0.12}
        position={ambientPosition}
        overlayTint="warm"
        className="py-12 lg:py-20"
      >
        <section className="mx-auto grid max-w-[1800px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24 lg:px-12">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="font-serif text-2xl italic leading-relaxed text-ink/80 lg:text-3xl">
                I take on a limited number of commissions each year. If our work
                speaks to you, I&apos;d love to hear about yours.
              </p>
              <div className="mt-16 space-y-8">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                    Email
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-2 block font-serif text-2xl hover:text-gold lg:text-3xl"
                  >
                    {contactEmail}
                  </a>
                </div>
                {siteSettings?.studioAddress && (
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                      Studio
                    </p>
                    <p className="mt-2 whitespace-pre-line font-serif text-xl text-ink/80 lg:text-2xl">
                      {siteSettings.studioAddress}
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </section>
      </AmbientBackdrop>
    </>
  );
}