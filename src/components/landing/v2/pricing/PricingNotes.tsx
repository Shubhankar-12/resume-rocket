import { RefreshCw, Infinity as InfinityIcon, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Calm, factual footnotes that answer the "so what am I actually paying for?"
 * questions — the distinction between subscription credits and one-time packs,
 * and how regional pricing is chosen. Policy copy, not business values.
 */
const NOTES: { icon: LucideIcon; text: string }[] = [
  {
    icon: RefreshCw,
    text: "Monthly subscription credits reset at the start of each billing cycle.",
  },
  {
    icon: InfinityIcon,
    text: "Purchased credit packs are one-time and never expire.",
  },
  {
    icon: Globe,
    text: "Regional pricing is shown automatically. Switch currency anytime above.",
  },
];

export function PricingNotes() {
  return (
    <div className="mt-16 border-t border-rr-border pt-8 md:mt-20">
      <dl className="grid gap-6 sm:grid-cols-3 sm:gap-10">
        {NOTES.map(({ icon: Icon, text }) => (
          <div key={text} className="flex gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-rr-accent" aria-hidden />
            <dd className="text-[13px] leading-relaxed text-rr-text-secondary">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
