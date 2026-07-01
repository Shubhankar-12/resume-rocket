import { Check } from "lucide-react";
import { HERO_CHIPS } from "./hero-data";

/** Quiet capability pills below the CTAs. */
export function FeatureChips() {
  return (
    <ul
      className="flex flex-wrap justify-center gap-2"
      aria-label="What you can do with ResumeRocket"
    >
      {HERO_CHIPS.map((chip) => (
        <li
          key={chip}
          className="inline-flex items-center gap-1.5 rounded-full border border-rr-border-muted bg-rr-card/60 px-3 py-1.5 text-xs font-medium text-rr-text-secondary"
        >
          <Check className="h-3.5 w-3.5 text-rr-success" aria-hidden />
          {chip}
        </li>
      ))}
    </ul>
  );
}
