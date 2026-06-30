import { GlassCard } from "../GlassCard";
import { TRACKER_DEMO } from "../../hero-demo-data";

export function TrackerCard() {
  return (
    <GlassCard className="w-72">
      <p className="text-xs font-semibold uppercase tracking-wide text-rr-text-muted">
        Application Tracker
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {TRACKER_DEMO.map((t) => (
          <div key={t.column} className="min-w-0">
            <p className="mb-1 truncate text-[10px] font-medium text-rr-text-muted">{t.column}</p>
            <div className="rounded-md border border-rr-border bg-rr-card p-1.5 text-[10px] leading-tight text-rr-text-secondary">
              {t.card}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
