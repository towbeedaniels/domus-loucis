"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  eventType: string;
  date: string;
  budget: string;
  story: string;
}

const EVENT_TYPES = [
  "Wedding",
  "Couples / Engagement",
  "Portrait",
  "Commercial / Brand",
  "Editorial / Magazine",
  "Lifestyle / Family",
  "Other",
];

const BUDGETS = [
  "Under $3,000",
  "$3,000 — $6,000",
  "$6,000 — $12,000",
  "$12,000+",
];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    eventType: "",
    date: "",
    budget: "",
    story: "",
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Hook up to Resend / API route in production
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex min-h-[500px] flex-col items-start justify-center border-l-2 border-gold pl-8"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
          Received
        </p>
        <h2 className="mt-6 font-serif text-5xl leading-[0.95] lg:text-7xl">
          Thank you, {form.name.split(" ")[0] || "friend"}.
        </h2>
        <p className="mt-8 max-w-md font-serif text-xl italic text-ink/70">
          I&apos;ll be in touch within two business days. In the meantime, take
          a slow breath.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-l-2 border-ink/10 pl-8 lg:pl-12"
    >
      {/* Progress */}
      <div className="mb-12 flex items-center gap-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
          Step {step + 1} of 3
        </span>
        <div className="flex flex-1 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-px flex-1 transition-colors duration-700",
                i <= step ? "bg-gold" : "bg-ink/10"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-3 block w-full border-b border-ink/30 bg-transparent py-3 font-serif text-3xl outline-none transition-colors focus:border-gold lg:text-4xl"
              />
            </div>
            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-3 block w-full border-b border-ink/30 bg-transparent py-3 font-serif text-3xl outline-none transition-colors focus:border-gold lg:text-4xl"
              />
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-10"
          >
            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                What kind of session?
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update("eventType", type)}
                    className={cn(
                      "rounded-full border px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
                      form.eventType === type
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/20 hover:border-ink"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                Approximate Date
              </label>
              <input
                type="text"
                placeholder="e.g. June 2026 or 'flexible'"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="mt-3 block w-full border-b border-ink/30 bg-transparent py-3 font-serif text-2xl outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                Investment Range
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => update("budget", b)}
                    className={cn(
                      "rounded-full border px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-500",
                      form.budget === b
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/20 hover:border-ink"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
              Tell us your story
            </label>
            <textarea
              required
              rows={8}
              value={form.story}
              onChange={(e) => update("story", e.target.value)}
              placeholder="Where, who, what feels important. There's no wrong way to begin."
              className="mt-3 block w-full resize-none border-b border-ink/30 bg-transparent py-3 font-serif text-xl outline-none transition-colors focus:border-gold"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="font-sans text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 0 ? !form.name || !form.email : !form.eventType}
            className="rounded-full border border-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:bg-ink hover:text-bone disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!form.story}
            className="rounded-full border border-ink bg-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-bone transition-all duration-500 hover:bg-ink-soft disabled:opacity-40"
          >
            Send Inquiry →
          </button>
        )}
      </div>
    </form>
  );
}