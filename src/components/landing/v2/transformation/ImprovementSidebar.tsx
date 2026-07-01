"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMPROVEMENTS, checklist, checkItem, rise, type SectionKey } from "./transformation-data";

/**
 * The "AI Improvements" panel. Each recommendation ticks in one after another,
 * and hovering (or focusing) one spotlights the matching section in the
 * improved resume — and vice versa — so the abstract list stays anchored to
 * concrete edits on the page.
 */
export function ImprovementSidebar({
  active,
  onItemHover,
}: {
  active: SectionKey | null;
  onItemHover: (key: SectionKey | null) => void;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.aside
      variants={rise(reduce, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="rounded-xl border border-rr-border bg-rr-card p-6 shadow-md"
      aria-label="Example AI improvements"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-rr-text">AI Improvements</h3>
        <span className="rounded-full border border-rr-border bg-rr-bg px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-rr-text-muted">
          Example
        </span>
      </div>

      <motion.ul variants={checklist(reduce)} className="mt-5 space-y-1">
        {IMPROVEMENTS.map((item) => {
          const isActive = active === item.target;
          return (
            <motion.li key={item.id} variants={checkItem(reduce)}>
              <button
                type="button"
                onMouseEnter={() => onItemHover(item.target)}
                onMouseLeave={() => onItemHover(null)}
                onFocus={() => onItemHover(item.target)}
                onBlur={() => onItemHover(null)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-200",
                  isActive ? "bg-rr-success/[0.08]" : "hover:bg-rr-bg"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    isActive ? "bg-rr-success text-white" : "bg-rr-success/12 text-rr-success"
                  )}
                >
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span
                  className={cn(
                    "text-[13px] leading-snug transition-colors duration-200",
                    isActive ? "font-medium text-rr-text" : "text-rr-text-secondary"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      <p className="mt-5 border-t border-rr-border-muted pt-3 text-[11px] leading-relaxed text-rr-text-muted">
        Preview of the kinds of recommendations ResumeRocket surfaces. Hover a line to see where it
        applies.
      </p>
    </motion.aside>
  );
}
