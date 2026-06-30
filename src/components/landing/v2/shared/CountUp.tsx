"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CountUp({
  to,
  suffix = "",
  durationMs = 1200,
  className,
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        const steps = Math.max(1, Math.round(durationMs / 40));
        let step = 0;
        const id = setInterval(() => {
          step += 1;
          setValue(Math.round((to * step) / steps));
          if (step >= steps) {
            setValue(to);
            clearInterval(id);
          }
        }, 40);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce, to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
