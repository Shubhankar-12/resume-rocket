import type { Currency } from "@/hooks/useCurrency";

/**
 * Formatting + labelling helpers for the pricing section. These are strictly
 * PRESENTATION: symbols, capitalisation, and human labels. Every business
 * value — price, credits, which features a plan includes — comes from the API.
 */

const SYMBOL: Record<Currency, string> = { USD: "$", INR: "₹" };

/**
 * `amount` arrives in the currency's smallest unit (cents / paise). Show whole
 * amounts without decimals (₹499, not ₹499.00) and only add the two-decimal
 * tail when the price actually has one.
 */
export function formatPrice(amount: number, currency: string): string {
  const symbol = SYMBOL[currency as Currency] ?? "";
  const major = amount / 100;
  const body = Number.isInteger(major) ? major.toLocaleString() : major.toFixed(2);
  return `${symbol}${body}`;
}

/** Human labels for the feature keys we know about; unknown keys fall back to a
 *  de-underscored, capitalised version so new backend features still render. */
const FEATURE_LABELS: Record<string, string> = {
  resume_analysis: "Resume analysis",
  resume_tailoring: "Resume tailoring",
  resume_tailor: "Resume tailoring",
  cover_letters: "Cover letters",
  cover_letter: "Cover letters",
  github_analysis: "GitHub analysis",
  application_tracker: "Application tracker",
  support: "Support",
  support_level: "Support",
  priority_support: "Priority support",
};

function labelFor(key: string): string {
  const known = FEATURE_LABELS[key];
  if (known) return known;
  const nice = key.replace(/_/g, " ");
  return nice.charAt(0).toUpperCase() + nice.slice(1);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface FeatureLine {
  /** The feature name shown in the list. */
  label: string;
  /** Whether the plan includes it — drives the check vs. muted-dash icon. */
  included: boolean;
}

/**
 * Turn a plan's raw `features` map into a display list. Value semantics:
 *  - boolean  → included / excluded
 *  - number   → "N cover letters" (0 ⇒ excluded)
 *  - string   → "Priority support" style qualifier
 *  - null/undefined ⇒ excluded
 */
export function toFeatureLines(features: Record<string, unknown>): FeatureLine[] {
  return Object.entries(features).map(([key, value]) => {
    if (typeof value === "boolean") {
      return { label: labelFor(key), included: value };
    }
    if (typeof value === "number") {
      const base = FEATURE_LABELS[key] ?? key.replace(/_/g, " ");
      return { label: `${value.toLocaleString()} ${base.toLowerCase()}`, included: value > 0 };
    }
    if (typeof value === "string" && value.trim()) {
      // e.g. support_level: "priority" → "Priority support"
      if (key === "support" || key === "support_level") {
        return { label: `${capitalize(value)} support`, included: true };
      }
      return { label: `${labelFor(key)}: ${value}`, included: true };
    }
    return { label: labelFor(key), included: false };
  });
}
