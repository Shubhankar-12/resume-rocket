"use client";

import { cn } from "@/lib/utils";
import { useCurrency, type Currency } from "@/hooks/useCurrency";

const OPTIONS: Currency[] = ["USD", "INR"];

export function RrCurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div
      role="group"
      aria-label="Currency"
      className="inline-flex rounded-full border border-rr-border bg-rr-card p-1"
    >
      {OPTIONS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
            currency === c ? "bg-rr-accent text-white" : "text-rr-text-secondary hover:text-rr-text"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
