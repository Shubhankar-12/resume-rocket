"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Typewriter({
  text,
  speed = 22,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [reduce, text.length, speed]);

  return (
    <p className={cn("text-sm leading-relaxed text-rr-text-secondary", className)}>
      {/* Full text for a11y + tests; the typewriter is a visual overlay only. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        {count < text.length && (
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-rr-accent align-middle" />
        )}
      </span>
    </p>
  );
}
