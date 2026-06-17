"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: boolean;
}

export function ParallaxImage({
  children,
  className,
  speed = 0.3,
  scale = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [1.1, 1.05, 1.15] : [1, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ y, scale: scaleValue, opacity }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}