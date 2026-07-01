"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LETTER =
  "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Engineer role. Over the past five years I've shipped accessible, performant React applications used by thousands of people every day.";

/** Stage 5 — an editor window that streams a personalized cover letter. */
export function CoverLetterPreview() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(reduce ? LETTER.length : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setCount(Math.min(i, LETTER.length));
      if (i >= LETTER.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const done = count >= LETTER.length;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-rr-border-muted bg-rr-card shadow-xs"
    >
      <div className="flex items-center gap-2 border-b border-rr-border-muted px-4 py-2.5">
        <Sparkles className="h-3.5 w-3.5 text-rr-accent" aria-hidden />
        <span className="text-[12px] font-medium text-rr-text">Cover letter</span>
        <span className="ml-auto text-[11px] text-rr-text-muted">
          {done ? "Draft ready" : "Generating…"}
        </span>
      </div>
      <div className="px-4 py-3.5">
        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-rr-text-secondary">
          {LETTER.slice(0, count)}
          {!reduce && !done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] animate-pulse bg-rr-accent align-middle" />
          )}
        </p>
      </div>
    </div>
  );
}
