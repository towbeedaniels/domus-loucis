import Image from "next/image";
import { cn } from "@/lib/utils";

type AmbientBackdropProps = {
  src?: string;
  sanityImageUrl?: string;
  alt?: string;
  opacity?: number;
  position?: "center" | "top" | "bottom";
  overlayTint?: "warm" | "neutral" | "deep";
  className?: string;
  children?: React.ReactNode;
};

export function AmbientBackdrop({
  src,
  sanityImageUrl,
  alt = "",
  opacity = 0.1,
  position = "center",
  overlayTint = "warm",
  className,
  children,
}: AmbientBackdropProps) {
  const resolvedSrc = sanityImageUrl ?? src;
  if (!resolvedSrc) {
    return (
      <div className={cn("relative", className)}>
        {children}
      </div>
    );
  }

  const objectPosition =
    position === "top"
      ? "object-top"
      : position === "bottom"
        ? "object-bottom"
        : "object-center";

  const overlayClass =
    overlayTint === "deep"
      ? "from-bone/95 via-bone/80 to-bone"
      : overlayTint === "neutral"
        ? "from-bone/95 via-bone/85 to-bone/70"
        : "from-bone/90 via-bone/80 to-bone";

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          priority={false}
          quality={70}
          sizes="100vw"
          className={cn("object-cover", objectPosition)}
          style={{ opacity }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            overlayClass,
          )}
        />
      </div>
      {children}
    </div>
  );
}