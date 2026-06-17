import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-bone px-6 text-center">
      <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
        404
      </p>
      <h1 className="mt-6 font-serif text-7xl leading-[0.9] lg:text-9xl">
        Lost in the light.
      </h1>
      <p className="mt-8 max-w-md font-serif text-xl italic text-ink/70">
        The page you&apos;re looking for has wandered off.
      </p>
      <Link
        href="/"
        className="mt-12 inline-flex items-center gap-3 rounded-full border border-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:bg-ink hover:text-bone"
      >
        Return Home
        <span aria-hidden>→</span>
      </Link>
    </section>
  );
}