"use client";

import { Check } from "lucide-react";
import { ScoreRing } from "../shared/ScoreRing";
import { Typewriter } from "../shared/Typewriter";
import { MiniKanban } from "../shared/MiniKanban";
import {
  DEMO_ANALYSIS,
  DEMO_TAILORED,
  DEMO_COVER,
  DEMO_GITHUB,
  DEMO_TRACKER,
} from "../part2-demo-data";

export function DeepDivePreview({ feature }: { feature: string }) {
  switch (feature) {
    case "analysis":
      return (
        <div className="rounded-2xl border border-rr-border bg-rr-card p-5">
          <div className="flex items-center gap-4">
            <ScoreRing value={DEMO_ANALYSIS.ats} size={72} centerText="A-" label="Grade A minus" />
            <div className="text-sm">
              <p className="text-rr-text-muted">
                ATS <span className="font-semibold text-rr-text">{DEMO_ANALYSIS.ats}%</span>
              </p>
              <p className="text-rr-text-muted">
                Keyword <span className="font-semibold text-rr-text">{DEMO_ANALYSIS.keyword}%</span>
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5">
            {DEMO_ANALYSIS.suggestions.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-rr-text-secondary">
                <Check className="h-3.5 w-3.5 text-rr-success" aria-hidden /> {s}
              </li>
            ))}
          </ul>
        </div>
      );
    case "tailoring":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-rr-border bg-rr-card p-4">
            <p className="text-xs font-semibold uppercase text-rr-text-muted">Original</p>
            <p className="mt-2 text-xs leading-relaxed text-rr-text-secondary">
              Frontend developer experienced with web applications.
            </p>
          </div>
          <div className="rounded-2xl border border-rr-accent/40 bg-rr-accent-light p-4">
            <p className="text-xs font-semibold uppercase text-rr-accent">Tailored</p>
            <p className="mt-2 text-xs leading-relaxed text-rr-text">
              Senior Frontend Engineer aligned to {DEMO_TAILORED.job}.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {DEMO_TAILORED.missingSkills.map((k) => (
                <span
                  key={k}
                  className="rounded bg-rr-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-rr-accent"
                >
                  +{k}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "cover":
      return (
        <div className="rounded-2xl border border-rr-border bg-rr-card p-5">
          <Typewriter text={DEMO_COVER.text} />
          <p className="mt-3 text-xs text-rr-text-muted">{DEMO_COVER.words} words</p>
        </div>
      );
    case "github":
      return (
        <div className="space-y-2">
          {DEMO_GITHUB.repos.map((r) => (
            <div key={r.name} className="rounded-xl border border-rr-border bg-rr-card p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-rr-text">{r.name}</span>
                <span className="text-[10px] font-semibold text-rr-success">{r.relevance}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {r.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-rr-border px-1.5 py-0.5 text-[10px] text-rr-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "tracker":
      return (
        <div className="rounded-2xl border border-rr-border bg-rr-card p-5">
          <MiniKanban columns={DEMO_TRACKER.columns} />
        </div>
      );
    default:
      return null;
  }
}
