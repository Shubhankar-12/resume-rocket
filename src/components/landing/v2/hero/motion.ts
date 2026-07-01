import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language for the hero. Every entrance resolves to its final
 * state instantly when the visitor prefers reduced motion — callers pass the
 * result of `useReducedMotion()` into the factories below.
 */

const EASE_OUT: Transition["ease"] = [0.2, 0, 0, 1];

export function heroStagger(reduce: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };
}

export function heroItem(reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: EASE_OUT },
    },
  };
}

export function browserRise(reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE_OUT, delay: reduce ? 0 : 0.15 },
    },
  };
}

/** Value a progress meter should animate to, honoring reduced motion. */
export function meterTransition(reduce: boolean, delay = 0): Transition {
  return { duration: reduce ? 0 : 1.1, ease: EASE_OUT, delay: reduce ? 0 : delay };
}
