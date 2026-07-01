"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency, type Currency } from "@/hooks/useCurrency";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
];

/**
 * Segmented control for the display currency. A single accent pill slides
 * between options (shared-element `layoutId`), the choice is remembered by
 * `useCurrency`, and reduced-motion collapses the slide to an instant swap.
 */
export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      role="group"
      aria-label="Display currency"
      className="inline-flex rounded-full border border-rr-border bg-rr-card p-1"
    >
      {OPTIONS.map(({ value, label }) => {
        const active = currency === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setCurrency(value)}
            aria-pressed={active}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-1 focus-visible:ring-offset-rr-card",
              active ? "text-white" : "text-rr-text-secondary hover:text-rr-text"
            )}
          >
            {active && (
              <motion.span
                layoutId="currency-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-rr-accent"
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }
                }
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
