"use client";

import { useMemo, useRef, useState, type ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DEMO_TABS } from "../part2-demo-data";
import { BrowserChrome } from "./BrowserChrome";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { TabNavigation } from "./TabNavigation";
import { DashboardPanel } from "./panels/DashboardPanel";
import { AnalysisPanel } from "./panels/AnalysisPanel";
import { TailoredPanel } from "./panels/TailoredPanel";
import { CoverLetterPanel } from "./panels/CoverLetterPanel";
import { GithubPanel } from "./panels/GithubPanel";
import { TrackerPanel } from "./panels/TrackerPanel";

const PANELS: Record<string, () => ReactElement> = {
  dashboard: DashboardPanel,
  analysis: AnalysisPanel,
  tailored: TailoredPanel,
  cover: CoverLetterPanel,
  github: GithubPanel,
  tracker: TrackerPanel,
};

/** The interactive product tour — a production-grade app window with a
 * synced sidebar, topbar, tabbed views, and a few live interactions. */
export function DemoBrowser() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const keyToIndex = useMemo(() => Object.fromEntries(DEMO_TABS.map((t, i) => [t.key, i])), []);

  const activeTab = DEMO_TABS[active];
  const Panel = PANELS[activeTab.key];

  return (
    <div className="overflow-hidden rounded-2xl border border-rr-border bg-rr-card shadow-[0_28px_60px_-20px_hsl(240_24%_10%/0.22)]">
      <BrowserChrome />

      <div className="grid lg:grid-cols-[240px_1fr]">
        <Sidebar
          active={activeTab.key}
          onSelect={(k) => setActive(keyToIndex[k])}
          reduce={reduce}
        />

        <div className="min-w-0">
          <Topbar activeLabel={activeTab.label} />
          <TabNavigation
            tabs={DEMO_TABS}
            active={active}
            onChange={setActive}
            tabRefs={tabRefs}
            reduce={reduce}
          />

          <div
            role="tabpanel"
            id={`demo-panel-${activeTab.key}`}
            aria-labelledby={`demo-tab-${activeTab.key}`}
            className="min-h-[380px] bg-rr-bg-elevated p-4 md:p-5"
          >
            <motion.div
              key={activeTab.key}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduce ? 0 : 0.18, ease: [0.2, 0, 0, 1] }}
            >
              <Panel />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
