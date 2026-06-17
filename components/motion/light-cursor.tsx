"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface LightCursorProps {
  enabled?: boolean;
}

export function LightCursor({ enabled = true }: LightCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 mix-blend-soft-light"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(245, 241, 234, 0.4), transparent 40%)",
        }}
      />
    </motion.div>
  );
}