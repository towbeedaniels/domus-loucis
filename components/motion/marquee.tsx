"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  className = "",
  pauseOnHover = true,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={`group flex w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 gap-12 pr-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          animationPlayState: pauseOnHover ? "running" : "running",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}