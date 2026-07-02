"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeValue = "light" | "dark";

const OPTIONS: { value: ThemeValue; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

/**
 * Compact segmented control for light / dark / system, driven by next-themes.
 * A single indicator slides under the active option (shared-element layout,
 * scoped per instance so multiple switchers don't animate into each other).
 * Hydration-safe: renders an inert skeleton until mounted so the server and
 * client markup match and there's no flash.
 */
export function ThemeSwitcher({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const layoutId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  const active = (theme as ThemeValue) ?? "light";
  const showLabels = size === "lg";
  const btn = size === "lg" ? "h-10 gap-2 px-4 text-sm" : "h-8 w-8 justify-center sm:aspect-square";

  function onKeyDown(e: React.KeyboardEvent) {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown";
    const prev = e.key === "ArrowLeft" || e.key === "ArrowUp";
    if (!next && !prev) return;
    e.preventDefault();
    const i = OPTIONS.findIndex((o) => o.value === active);
    const n = (i + (next ? 1 : -1) + OPTIONS.length) % OPTIONS.length;
    setTheme(OPTIONS[n].value);
    refs.current[n]?.focus();
  }

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full border border-rr-border bg-rr-card p-0.5",
          size === "lg" ? "h-11" : "h-9",
          className
        )}
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-rr-border bg-rr-card p-0.5",
        className
      )}
    >
      {OPTIONS.map(({ value, label, Icon }, i) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="radio"
            type="button"
            aria-checked={isActive}
            aria-label={label}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setTheme(value)}
            className={cn(
              "relative inline-flex items-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
              btn,
              isActive ? "text-rr-text" : "text-rr-text-muted hover:text-rr-text"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`theme-ind-${layoutId}`}
                aria-hidden
                className="absolute inset-0 rounded-full bg-rr-bg-elevated shadow-sm ring-1 ring-rr-border/60"
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }
                }
              />
            )}
            <Icon className={cn("relative shrink-0", size === "lg" ? "h-4 w-4" : "h-4 w-4")} />
            {showLabels && <span className="relative">{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
