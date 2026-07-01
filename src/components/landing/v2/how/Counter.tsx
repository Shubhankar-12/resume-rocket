"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts a number up from 0 to `to` when it scrolls into view. Renders the
 * final value immediately under reduced motion.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.1,
  reduce,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0, 0, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
