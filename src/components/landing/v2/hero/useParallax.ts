"use client";

import { useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import type React from "react";

/**
 * Pointer-driven parallax capped at `strength` px in each axis.
 * Returns zeroed, inert values under reduced motion (handlers become no-ops).
 */
export function useParallax(strength = 10) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * strength);
    rawY.set(py * strength);
  };
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { x, y, bind: { onMouseMove, onMouseLeave } };
}
