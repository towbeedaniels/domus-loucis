"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "next-sanity";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/sanity";

interface FaqAccordionProps {
  items: FaqItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  booking: "Booking",
  pricing: "Pricing",
  process: "Process",
  deliverables: "Deliverables",
  general: "General",
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] || "general"
  );
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = items.filter((i) => i.category === activeCategory);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3 border-b border-ink/10 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenId(null);
            }}
            className={cn(
              "rounded-full border px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
              activeCategory === cat
                ? "border-ink bg-ink text-bone"
                : "border-ink/20 hover:border-ink"
            )}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      <div className="divide-y divide-ink/10">
        {filtered.map((item) => {
          const isOpen = openId === item._id;
          return (
            <div key={item._id}>
              <button
                onClick={() => setOpenId(isOpen ? null : item._id)}
                className="flex w-full items-center justify-between gap-6 py-8 text-left"
                aria-expanded={isOpen}
              >
                <h3 className="font-serif text-2xl leading-tight lg:text-3xl">
                  {item.question}
                </h3>
                <span
                  className={cn(
                    "shrink-0 font-serif text-3xl text-gold transition-transform duration-700 ease-editorial",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="prose prose-lg max-w-2xl pb-8 font-serif text-lg leading-relaxed text-ink/75">
                      <PortableText value={item.answer as never[]} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}