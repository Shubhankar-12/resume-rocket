"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Sparkles, Copy, Download } from "lucide-react";
import { COVER } from "../tour-data";

export function CoverLetterPanel() {
  const reduce = useReducedMotion() ?? false;
  const [count, setCount] = useState(reduce ? COVER.text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setCount(Math.min(i, COVER.text.length));
      if (i >= COVER.text.length) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [reduce]);

  const done = count >= COVER.text.length;

  return (
    <div className="overflow-hidden rounded-xl border border-rr-border-muted bg-rr-card">
      <div className="flex items-center gap-2 border-b border-rr-border-muted px-4 py-2.5">
        <Sparkles className="h-4 w-4 text-rr-accent" aria-hidden />
        <span className="text-[13px] font-medium text-rr-text">Cover letter · {COVER.role}</span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-rr-text-secondary transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            Copy
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-rr-text-secondary transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Download
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="min-h-[7rem] whitespace-pre-wrap text-[13px] leading-relaxed text-rr-text-secondary">
          {COVER.text.slice(0, count)}
          {!reduce && !done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] animate-pulse bg-rr-accent align-middle" />
          )}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-rr-border-muted px-4 py-2 text-[11px] text-rr-text-muted">
        <span>{done ? "Draft ready" : "Generating…"}</span>
        <span>{COVER.words} words</span>
      </div>
    </div>
  );
}
