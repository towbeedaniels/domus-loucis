import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/journal", label: "Journal" },
      { href: "/press", label: "Press" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/portfolio", label: "All Work" },
      { href: "/portfolio/category/weddings", label: "Weddings" },
      { href: "/portfolio/category/portraits", label: "Portraits" },
      { href: "/portfolio/category/commercial", label: "Commercial" },
    ],
  },
  {
    heading: "Client",
    links: [
      { href: "/contact", label: "Inquire" },
      { href: "/faq", label: "FAQ" },
      { href: "/shop", label: "Shop Prints" },
      { href: "/account", label: "Client Login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-ink text-bone">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="mx-auto max-w-[1800px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Editorial block */}
          <div className="lg:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
              Domus Loucis
            </p>
            <h2 className="mt-6 font-serif text-5xl leading-[0.95] lg:text-7xl">
              House
              <br />
              of Light.
            </h2>
            <p className="mt-8 max-w-md font-serif text-xl italic text-bone/70">
              Photography rooted in intimacy and light — weddings, portraits,
              editorial, and brand.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-bone/30 px-6 py-3 font-sans text-xs uppercase tracking-[0.25em] text-bone transition-all duration-500 hover:border-gold hover:text-gold"
            >
              Begin Your Story
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                  {group.heading}
                </h3>
                <ul className="mt-6 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-serif text-lg text-bone/80 transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-8 font-sans text-xs uppercase tracking-[0.2em] text-bone/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Domus Loucis. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
            <Link href="/studio" className="hover:text-gold">
              Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}