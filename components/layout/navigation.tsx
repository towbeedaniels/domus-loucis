"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "Studio" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial",
          scrolled
            ? "bg-bone/85 backdrop-blur-md py-3 border-b border-ink/5"
            : "bg-transparent py-6"
        )}
      >
        <nav className="mx-auto flex max-w-[1800px] items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="group flex items-baseline gap-3"
            aria-label="Domus Loucis — Home"
          >
            <span className="font-serif text-2xl tracking-tight lg:text-3xl">
              Domus Loucis
            </span>
            <span className="hidden font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60 lg:inline">
              House of Light
            </span>
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-sans text-sm tracking-wide text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-editorial group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="hidden rounded-full border border-ink/20 px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:border-ink hover:bg-ink hover:text-bone lg:inline-block"
          >
            Inquire
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "h-px w-6 bg-ink transition-transform duration-500 ease-editorial",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-ink transition-transform duration-500 ease-editorial",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-bone transition-opacity duration-700 ease-editorial lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: open ? `${i * 80 + 200}ms` : "0ms",
              }}
              className={cn(
                "translate-y-4 font-serif text-4xl opacity-0 transition-all duration-700 ease-editorial",
                open && "translate-y-0 opacity-100"
              )}
            >
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}