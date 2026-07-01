"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A soft green "highlighter" that sweeps across added or rewritten text when it
 * enters the viewport — deliberately unlike a red/green git diff. The check
 * icon and the sr-only "Improved:" prefix carry the meaning without relying on
 * colour alone (accessibility). `delay` lets callers cascade highlights so the
 * changes reveal one after another.
 */
export function Highlight({
  children,
  delay = 0,
  revealed,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  /** When set, the sweep is driven by the parent card's in-view state instead
   *  of the marker's own viewport — so the text is never gated on the tiny
   *  marker element crossing a threshold. */
  revealed?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const marker = (
    <motion.span
      aria-hidden
      className="absolute inset-x-[-2px] inset-y-[-1px] origin-left rounded-[3px] bg-rr-success/15"
      style={{ transformOrigin: "left" }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.2, 0, 0, 1], delay: reduce ? 0 : delay }}
      {...(revealed === undefined
        ? {
            initial: reduce ? { scaleX: 1 } : { scaleX: 0 },
            whileInView: { scaleX: 1 },
            viewport: { once: true, amount: 0.6 },
          }
        : {
            initial: false,
            animate: { scaleX: reduce || revealed ? 1 : 0 },
          })}
    />
  );

  return (
    <span className={cn("relative inline", className)}>
      <span className="sr-only">Improved: </span>
      {marker}
      <span className="relative">{children}</span>
    </span>
  );
}
