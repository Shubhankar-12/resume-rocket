"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { FAQ_CATEGORIES, type FaqCategoryId } from "../part3-faq-data";

export function FAQCategories({
  active,
  counts,
  dimmed,
  onSelect,
}: {
  active: FaqCategoryId;
  counts: Record<FaqCategoryId, number>;
  /** Categories with no matches for the current search — shown dimmed, still clickable. */
  dimmed?: Set<FaqCategoryId>;
  onSelect: (id: FaqCategoryId) => void;
}) {
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move focus (and selection) between categories, in whichever
  // direction the layout runs — vertical on desktop, horizontal on mobile.
  function onKeyDown(e: React.KeyboardEvent) {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight";
    const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!next && !prev) return;
    e.preventDefault();
    const i = FAQ_CATEGORIES.findIndex((c) => c.id === active);
    const n = (i + (next ? 1 : -1) + FAQ_CATEGORIES.length) % FAQ_CATEGORIES.length;
    onSelect(FAQ_CATEGORIES[n].id);
    btns.current[n]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="FAQ categories"
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {FAQ_CATEGORIES.map((cat, i) => {
        const isActive = cat.id === active;
        const Icon = cat.icon;
        return (
          <button
            key={cat.id}
            ref={(el) => {
              btns.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent lg:w-full lg:rounded-lg",
              isActive
                ? "border-rr-accent/40 bg-rr-accent-light font-medium text-rr-accent"
                : "border-rr-border text-rr-text-secondary hover:border-rr-accent/30 hover:text-rr-text",
              dimmed?.has(cat.id) && !isActive && "opacity-45"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="lg:flex-1 lg:text-left">{cat.title}</span>
            <span
              className={cn(
                "text-xs tabular-nums",
                isActive ? "text-rr-accent/70" : "text-rr-text-muted"
              )}
            >
              {counts[cat.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
