"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEMO_TABS } from "../part2-demo-data";
import { DashboardTab } from "./tabs/DashboardTab";
import { AnalysisTab } from "./tabs/AnalysisTab";
import { TailoredTab } from "./tabs/TailoredTab";
import { CoverLetterTab } from "./tabs/CoverLetterTab";
import { GitHubTab } from "./tabs/GitHubTab";
import { TrackerTab } from "./tabs/TrackerTab";

const PANELS: Record<string, () => React.ReactElement> = {
  dashboard: DashboardTab,
  analysis: AnalysisTab,
  tailored: TailoredTab,
  cover: CoverLetterTab,
  github: GitHubTab,
  tracker: TrackerTab,
};

export function DemoBrowser() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (next: number) => {
    const i = (next + DEMO_TABS.length) % DEMO_TABS.length;
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(DEMO_TABS.length - 1);
    }
  };

  const activeKey = DEMO_TABS[active].key;
  const Panel = PANELS[activeKey];

  return (
    <div className="overflow-hidden rounded-2xl border border-rr-border bg-rr-card shadow-[0_24px_48px_-16px_hsl(240_24%_10%/0.18)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-rr-border bg-rr-bg-elevated px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-rr-danger/60" />
          <span className="h-3 w-3 rounded-full bg-rr-warning/60" />
          <span className="h-3 w-3 rounded-full bg-rr-success/60" />
        </div>
        <div className="flex-1 truncate rounded-md bg-rr-card px-3 py-1 text-center text-xs text-rr-text-muted">
          app.resumerocket.example/dashboard
        </div>
      </div>

      <div className="grid md:grid-cols-[200px_1fr]">
        {/* sidebar tablist */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Preview Workspace tabs"
          className="flex gap-1 overflow-x-auto border-b border-rr-border p-2 md:flex-col md:overflow-visible md:border-b-0 md:border-r"
        >
          {DEMO_TABS.map((tab, i) => (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`demo-tab-${tab.key}`}
              aria-selected={i === active}
              aria-controls={`demo-panel-${tab.key}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
                i === active
                  ? "bg-rr-accent-light text-rr-accent"
                  : "text-rr-text-secondary hover:bg-rr-bg-elevated hover:text-rr-text"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* panel */}
        <div
          role="tabpanel"
          id={`demo-panel-${activeKey}`}
          aria-labelledby={`demo-tab-${activeKey}`}
          className="min-h-[320px] p-4 md:p-6"
        >
          <motion.div
            key={activeKey}
            initial={reduce ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Panel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
