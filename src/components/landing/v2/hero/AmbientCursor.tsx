"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A scripted pointer that drifts across the preview once and soft-clicks, to
 * suggest the product is alive. Purely decorative and skipped for reduced motion.
 */
export function AmbientCursor() {
  const reduce = useReducedMotion() ?? false;
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20"
      initial={{ left: "74%", top: "14%", opacity: 0 }}
      whileInView={{
        left: ["74%", "52%", "24%"],
        top: ["14%", "50%", "68%"],
        opacity: [0, 1, 1],
      }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 4.5, ease: "easeInOut", times: [0, 0.5, 1], delay: 1 }}
    >
      {/* click ripple, timed to the pointer landing */}
      <motion.span
        className="absolute -left-1 -top-1 block h-6 w-6 rounded-full bg-rr-accent/30"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.6], opacity: [0.5, 0] }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 5.4, ease: "easeOut" }}
      />
      <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-sm">
        <path
          d="M5 3l14 7-6 2-2 6-6-15z"
          fill="hsl(var(--rr-text))"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
