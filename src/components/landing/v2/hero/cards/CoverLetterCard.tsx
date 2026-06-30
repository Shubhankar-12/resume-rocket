"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { COVER_LETTER_DEMO } from "../../hero-demo-data";

export function CoverLetterCard() {
  const reduce = useReducedMotion();
  const full = COVER_LETTER_DEMO.text;
  const [count, setCount] = useState(reduce ? full.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= full.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [reduce, full.length]);

  return (
    <GlassCard className="w-64">
      <span className="rounded-full bg-rr-accent-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rr-accent">
        {COVER_LETTER_DEMO.label}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-rr-text-secondary">
        {/* Full text present for a11y + tests; the typewriter is a visual overlay only. */}
        <span className="sr-only">{full}</span>
        <span aria-hidden>
          {full.slice(0, count)}
          {count < full.length && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-rr-accent align-middle" />
          )}
        </span>
      </p>
    </GlassCard>
  );
}
