"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { SUGGESTIONS, ACTIVITY, PIPELINE } from "./hero-data";
import { meterTransition } from "./motion";

type Tone = "accent" | "info" | "success";

const DOT: Record<Tone, string> = {
  accent: "bg-rr-accent",
  info: "bg-rr-info",
  success: "bg-rr-success",
};

function PanelShell({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-rr-text">{title}</h3>
        {right}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function SuggestionsPanel() {
  const reduce = useReducedMotion() ?? false;

  return (
    <PanelShell
      title="Suggestions"
      right={
        <span className="rounded-full bg-rr-accent-light px-2 py-0.5 text-[11px] font-semibold text-rr-accent">
          {SUGGESTIONS.length} to review
        </span>
      }
    >
      <motion.ul
        className="flex flex-col gap-2.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
      >
        {SUGGESTIONS.map((s) => (
          <motion.li
            key={s}
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -6 },
              show: { opacity: 1, x: 0 },
            }}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rr-success/12">
              <Check className="h-3 w-3 text-rr-success" aria-hidden />
            </span>
            <span className="text-[13px] text-rr-text-secondary">{s}</span>
          </motion.li>
        ))}
      </motion.ul>
    </PanelShell>
  );
}

export function ActivityPanel() {
  return (
    <PanelShell title="Recent activity">
      <ol className="flex flex-col gap-3">
        {ACTIVITY.map((a) => (
          <li key={a.label} className="flex items-center gap-2.5">
            <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[a.tone]}`} aria-hidden />
            <span className="text-[13px] text-rr-text-secondary">{a.label}</span>
            <span className="ml-auto text-[11px] text-rr-text-muted">{a.meta}</span>
          </li>
        ))}
      </ol>
    </PanelShell>
  );
}

export function ApplicationsPanel() {
  const reduce = useReducedMotion() ?? false;
  const total = PIPELINE.reduce((n, p) => n + p.count, 0);

  return (
    <PanelShell
      title="Applications"
      right={<span className="text-[11px] text-rr-text-muted">{total} active</span>}
    >
      <div className="flex h-2 overflow-hidden rounded-full bg-rr-border-muted">
        {PIPELINE.map((p, i) => (
          <motion.div
            key={p.stage}
            className={DOT[p.tone]}
            initial={{ width: reduce ? `${(p.count / total) * 100}%` : "0%" }}
            whileInView={{ width: `${(p.count / total) * 100}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={meterTransition(reduce, 0.1 * i)}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {PIPELINE.map((p) => (
          <div key={p.stage} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[p.tone]}`} aria-hidden />
            <span className="text-xs text-rr-text-secondary">{p.stage}</span>
            <span className="text-xs font-semibold text-rr-text">{p.count}</span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
