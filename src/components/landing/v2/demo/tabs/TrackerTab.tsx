"use client";

import { MiniKanban } from "../../shared/MiniKanban";
import { DEMO_TRACKER } from "../../part2-demo-data";

export function TrackerTab() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(DEMO_TRACKER.counts).map(([k, v]) => (
          <span
            key={k}
            className="rounded-lg border border-rr-border bg-rr-card px-3 py-1.5 text-xs text-rr-text-secondary"
          >
            {k} <span className="font-semibold text-rr-text">{v}</span>
          </span>
        ))}
      </div>
      <div className="rounded-xl border border-rr-border bg-rr-card p-4">
        <MiniKanban columns={DEMO_TRACKER.columns} />
      </div>
    </div>
  );
}
