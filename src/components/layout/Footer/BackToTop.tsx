"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      type="button"
      onClick={toTop}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rr-border px-3 text-xs font-medium text-rr-text-secondary transition-colors hover:border-rr-accent/40 hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
    >
      Back to top
      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
    </button>
  );
}
