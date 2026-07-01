"use client";

import { motion } from "framer-motion";

export type TabDef = { key: string; label: string };

/** The six top tabs — a real tablist with roving focus and a sliding underline. */
export function TabNavigation({
  tabs,
  active,
  onChange,
  tabRefs,
  reduce,
}: {
  tabs: readonly TabDef[];
  active: number;
  onChange: (index: number) => void;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  reduce: boolean;
}) {
  const move = (next: number) => {
    const i = (next + tabs.length) % tabs.length;
    onChange(i);
    tabRefs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(tabs.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Product views"
      className="flex gap-1 overflow-x-auto border-b border-rr-border-muted bg-rr-card px-2"
    >
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`demo-tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={`demo-panel-${tab.key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`relative shrink-0 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent ${
              isActive ? "text-rr-accent" : "text-rr-text-secondary hover:text-rr-text"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="tour-tab-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-rr-accent"
                transition={{ duration: reduce ? 0 : 0.25, ease: [0.2, 0, 0, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
