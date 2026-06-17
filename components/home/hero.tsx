"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

interface HeroProps {
  title: string[];
  tagline?: string;
  videoUrl?: string;
  posterImage?: string;
  posterAlt?: string;
}

export function Hero({
  title,
  tagline = "House of Light",
  videoUrl,
  posterImage,
  posterAlt = "Domus Loucis",
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-ink"
    >
      {/* Background media */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
            className="h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : posterImage ? (
          <Image
            src={posterImage}
            alt={posterAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink via-ink-soft to-ink" />
        )}
        {/* Editorial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col justify-between p-8 text-bone lg:p-16"
      >
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-bone/80">
            Domus Loucis — {tagline}
          </span>
        </motion.div>

        {/* Title */}
        <div className="max-w-[1800px]">
          <div className="flex flex-col gap-2">
            {title.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <TextReveal
                  as="h1"
                  className="font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-tight"
                  delay={0.6 + i * 0.2}
                  staggerChildren={0.06}
                  duration={1.4}
                >
                  {line}
                </TextReveal>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <MagneticButton href="/portfolio" variant="outline-light">
              View Portfolio
              <span aria-hidden>→</span>
            </MagneticButton>
            <Link
              href="/contact"
              className="group flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-bone/80 transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-bone/40 transition-all group-hover:w-12 group-hover:bg-gold" />
              Begin Your Story
            </Link>
          </motion.div>
        </div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/60">
              Editorial · Wedding · Portrait · Brand
            </p>
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden flex-col items-center gap-2 text-bone/70 lg:flex"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <span className="h-12 w-px bg-bone/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}