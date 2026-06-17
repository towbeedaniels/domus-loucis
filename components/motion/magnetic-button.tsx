"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline-light";
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary:
      "bg-ink text-bone border-ink hover:bg-ink-soft",
    ghost:
      "bg-transparent text-ink border-transparent hover:border-ink/20",
    "outline-light":
      "bg-transparent text-bone border-bone/40 hover:border-gold hover:text-gold",
  };

  const buttonClass = cn(
    "group relative inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-500 ease-editorial",
    variants[variant],
    className
  );

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} className={buttonClass}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={buttonClass}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}