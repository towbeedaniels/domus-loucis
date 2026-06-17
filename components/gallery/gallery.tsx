"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imageUrl } from "@/sanity/lib/image";
import type { PhotoDetail } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface GalleryProps {
  photos: PhotoDetail[];
}

export function Gallery({ photos }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, next, prev]);

  if (!photos.length) return null;

  return (
    <>
      <div className="grid grid-cols-12 gap-3 md:gap-6">
        {photos.map((photo, i) => (
          <GalleryTile
            key={photo._id}
            photo={photo}
            index={i}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute right-6 top-6 z-10 font-sans text-xs uppercase tracking-[0.3em] text-bone/70 transition-colors hover:text-bone"
            >
              Close ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-6 top-1/2 z-10 -translate-y-1/2 font-sans text-3xl text-bone/60 transition-colors hover:text-bone"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-6 top-1/2 z-10 -translate-y-1/2 font-sans text-3xl text-bone/60 transition-colors hover:text-bone"
            >
              →
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative h-[90vh] w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageUrl(photos[lightboxIndex].image, {
                  width: 2400,
                  quality: 90,
                  auto: "format",
                })}
                alt={photos[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const TILE_LAYOUTS = [
  "col-span-12 md:col-span-8 aspect-[4/3]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-6 aspect-[5/4]",
  "col-span-12 md:col-span-6 aspect-[5/4]",
  "col-span-12 md:col-span-12 aspect-[16/9]",
  "col-span-12 md:col-span-5 aspect-[3/4]",
  "col-span-12 md:col-span-7 aspect-[5/4]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-8 aspect-[4/3]",
];

function GalleryTile({
  photo,
  index,
  onClick,
}: {
  photo: PhotoDetail;
  index: number;
  onClick: () => void;
}) {
  const src = imageUrl(photo.image, {
    width: 1600,
    quality: 85,
    auto: "format",
  });
  const layout = TILE_LAYOUTS[index % TILE_LAYOUTS.length];

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1.2,
        delay: (index % 3) * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden bg-mist focus:outline-none",
        layout
      )}
      aria-label={`View ${photo.title || photo.alt}`}
    >
      <Image
        src={src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
    </motion.button>
  );
}