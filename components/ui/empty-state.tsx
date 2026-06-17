import Link from "next/link";
import { cn } from "@/lib/utils";
import { MonogramMark } from "./monogram-mark";

interface EmptyStateProps {
  message: string;
  className?: string;
  href?: string;
  hrefLabel?: string;
}

export function EmptyState({
  message,
  className,
  href = "/studio",
  hrefLabel = "Manage content at /studio",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-gold/30 bg-gradient-to-br from-dawn/40 via-bone-soft to-dusk/30 p-12 text-center lg:p-20",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
      >
        <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-dawn/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-dusk/30 blur-3xl" />
      </div>
      <div className="relative">
        <div className="mx-auto mb-8 opacity-60">
          <MonogramMark size={56} />
        </div>
        <div className="mx-auto mb-8 h-px w-16 bg-gold" />
        <p className="font-serif text-2xl italic leading-relaxed text-ink/70 lg:text-3xl">
          {message}
        </p>
        <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
          <Link href={href} className="transition-colors hover:text-gold">
            {hrefLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}