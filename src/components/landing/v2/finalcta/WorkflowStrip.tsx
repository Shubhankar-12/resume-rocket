import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A very quiet single-line recap of the arc the visitor just read: upload →
 * analysis → tailor → cover letter → apply. Decorative (aria-hidden) and
 * intentionally understated so it echoes the Hero's dashboard without
 * competing with it.
 */
const STEPS = [
  "Resume uploaded",
  "ATS analysis complete",
  "Tailored resume ready",
  "Cover letter generated",
  "Ready to apply",
];

export function WorkflowStrip() {
  return (
    <div
      aria-hidden
      className="mt-12 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[11px]"
    >
      {STEPS.map((step, i) => {
        const last = i === STEPS.length - 1;
        return (
          <div key={step} className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
                last
                  ? "border-rr-accent/30 bg-rr-accent-light font-medium text-rr-accent"
                  : "border-rr-border/60 bg-rr-card/50 text-rr-text-muted"
              )}
            >
              {last ? (
                <span className="h-1.5 w-1.5 rounded-full bg-rr-accent" />
              ) : (
                <Check className="h-3 w-3 text-rr-success" />
              )}
              {step}
            </span>
            {!last && <span className="h-px w-4 bg-rr-border" />}
          </div>
        );
      })}
    </div>
  );
}
