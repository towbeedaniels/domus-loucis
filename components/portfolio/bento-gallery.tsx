"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { imageUrl } from "@/sanity/lib/image";
import type { CollectionSummary } from "@/types/sanity";

interface BentoGalleryProps {
  collections: CollectionSummary[];
}

const LAYOUTS = [
  "md:col-span-7 md:row-span-2 aspect-[4/5]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-8 aspect-[16/9]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-6 aspect-[5/4]",
  "md:col-span-6 aspect-[5/4]",
];

export function BentoGallery({ collections }: BentoGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)] md:gap-6">
      {collections.slice(0, LAYOUTS.length).map((collection, i) => (
        <BentoCard
          key={collection._id}
          collection={collection}
          className={LAYOUTS[i]}
          index={i}
        />
      ))}
    </div>
  );
}

function BentoCard({
  collection,
  className,
  index,
}: {
  collection: CollectionSummary;
  className?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const src = imageUrl(collection.coverImage, {
    width: 1600,
    quality: 85,
    auto: "format",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 1.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative overflow-hidden bg-mist ${className ?? ""}`}
    >
      <Link
        href={`/portfolio/${collection.slug.current}`}
        className="group block h-full w-full"
        aria-label={`View ${collection.title}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={src}
            alt={collection.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-[1.04]"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 lg:p-8">
          <div className="text-bone">
            {collection.category && (
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                {collection.category.title}
              </p>
            )}
            <h3 className="mt-2 font-serif text-3xl leading-[0.95] lg:text-5xl">
              {collection.title}
            </h3>
            {collection.location && (
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-bone/70">
                {collection.location}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/40 text-bone transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink lg:flex"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}