"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ICONS } from "../shared/iconMap";
import { ScoreRing } from "../shared/ScoreRing";
import { CountUp } from "../shared/CountUp";
import { Typewriter } from "../shared/Typewriter";
import { HOW_STEPS } from "../part2-demo-data";

type Step = (typeof HOW_STEPS)[number];
type Preview = Step["preview"];

function StepPreview({ preview }: { preview: Preview }) {
  switch (preview.kind) {
    case "upload":
      return (
        <div className="rounded-lg border border-rr-border bg-rr-bg-elevated p-2 text-xs">
          <p className="truncate font-medium text-rr-text">{preview.file}</p>
          <p className="text-rr-success">{preview.status}</p>
        </div>
      );
    case "parse":
      return (
        <dl className="grid grid-cols-3 gap-1 text-center text-xs">
          {[
            { k: "Experience", v: preview.experience },
            { k: "Skills", v: preview.skills },
            { k: "Projects", v: preview.projects },
          ].map((m) => (
            <div key={m.k} className="rounded-md bg-rr-bg-elevated py-1.5">
              <dd className="text-sm font-bold text-rr-text">
                <CountUp to={m.v} />
              </dd>
              <dt className="text-[10px] text-rr-text-muted">{m.k}</dt>
            </div>
          ))}
        </dl>
      );
    case "score":
      return (
        <div className="flex items-center gap-3">
          <ScoreRing
            value={preview.ats}
            size={56}
            centerText={preview.grade}
            label={`Grade ${preview.grade}`}
          />
          <p className="text-xs text-rr-text-muted">
            ATS <span className="font-semibold text-rr-text">{preview.ats}%</span>
          </p>
        </div>
      );
    case "tailor":
      return (
        <div className="flex gap-2 text-xs">
          <span className="rounded-md bg-rr-success/10 px-2 py-1 text-rr-success">
            <CountUp to={preview.matching} /> matching
          </span>
          <span className="rounded-md bg-rr-warning/10 px-2 py-1 text-rr-warning">
            <CountUp to={preview.missing} /> missing
          </span>
        </div>
      );
    case "cover":
      return <Typewriter text={preview.text} className="text-xs" />;
    case "track":
      return (
        <div className="grid grid-cols-4 gap-1">
          {preview.columns.map((c) => (
            <span
              key={c}
              className="truncate rounded bg-rr-bg-elevated px-1 py-1 text-center text-[9px] text-rr-text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      );
  }
}

export function TimelineStep({ step, index }: { step: Step; index: number }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[step.icon];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: reduce ? 0 : index * 0.08 }}
      className="relative flex flex-col rounded-2xl border border-rr-border bg-rr-card p-4"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="text-xs font-semibold text-rr-text-muted">Step {step.n}</span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-rr-text">{step.title}</h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-rr-text-secondary">{step.desc}</p>
      <div className="mt-3">
        <StepPreview preview={step.preview} />
      </div>
    </motion.div>
  );
}
