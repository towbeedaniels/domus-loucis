import { cn } from "@/lib/utils";

type MonogramMarkProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function MonogramMark({
  size = 48,
  className,
  strokeWidth = 0.8,
}: MonogramMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Inner sun rays — short, eight directions */}
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="11" />
        <line x1="32" y1="53" x2="32" y2="58" />
        <line x1="6" y1="32" x2="11" y2="32" />
        <line x1="53" y1="32" x2="58" y2="32" />
        <line x1="13.6" y1="13.6" x2="17.1" y2="17.1" />
        <line x1="46.9" y1="46.9" x2="50.4" y2="50.4" />
        <line x1="50.4" y1="13.6" x2="46.9" y2="17.1" />
        <line x1="17.1" y1="46.9" x2="13.6" y2="50.4" />
      </g>
      {/* D */}
      <path
        d="M 20 22 L 20 42 L 27 42 C 32 42 35 39 35 32 C 35 25 32 22 27 22 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth + 0.2}
        strokeLinejoin="round"
        fill="none"
      />
      {/* L */}
      <path
        d="M 39 22 L 39 42 L 47 42"
        stroke="currentColor"
        strokeWidth={strokeWidth + 0.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}