import Link from "next/link";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";

export const metadata = {
  title: "Client Login",
  description: "Access your private proofing gallery.",
};

export default function AccountPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bone via-bone-soft to-dawn/30 pt-40 pb-32 lg:pt-56 lg:pb-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-dawn/40 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-dusk/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-2xl px-6 lg:px-12">
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
            Client Portal
          </p>
        </FadeIn>
        <TextReveal
          as="h1"
          className="mt-6 font-serif text-6xl leading-[0.9] lg:text-8xl"
        >
          Welcome back.
        </TextReveal>

        <form className="mt-16 space-y-8 border-l-2 border-gold pl-8 lg:pl-12">
          <div>
            <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-3 block w-full border-b border-ink/30 bg-transparent py-3 font-serif text-2xl outline-none transition-colors focus:border-gold"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="rounded-full border border-ink bg-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-bone transition-all duration-500 hover:bg-ink-soft"
          >
            Send Magic Link →
          </button>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-taupe">
            We&apos;ll email you a secure link to view your gallery.
          </p>
        </form>

        <div className="mt-20">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-ink"
          >
            <span className="h-px w-8 bg-ink transition-all duration-500 group-hover:w-16" />
            Need help? Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}