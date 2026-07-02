"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Rocket } from "lucide-react";
import { NODES } from "./workspace-data";

// Hexagonal positions (percent) around a centre hub, aligned to NODES order.
const POS = [
  { x: 50, y: 14 }, // analysis (top)
  { x: 81, y: 32 }, // tailored (upper right)
  { x: 81, y: 68 }, // cover (lower right)
  { x: 50, y: 86 }, // github (bottom)
  { x: 19, y: 68 }, // tracker (lower left)
  { x: 19, y: 32 }, // billing (upper left)
];

export function EcosystemDiagram() {
  const reduce = useReducedMotion() ?? false;
  const [hover, setHover] = useState<string | null>(null);

  return (
    <figure
      aria-label="ResumeRocket connects six capabilities — resume analysis, tailored resume, cover letter, GitHub analysis, application tracker, and credits & billing — into one workspace."
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* subtle mesh, behind the ecosystem only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--rr-accent)/0.07),transparent)] blur-xl"
      />

      {/* ── desktop: radial hub-and-spoke ── */}
      <div className="relative hidden aspect-square lg:block">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {NODES.map((node, i) => {
            const active = hover === node.key;
            return (
              <g key={node.key}>
                <motion.line
                  x1="50"
                  y1="50"
                  x2={POS[i].x}
                  y2={POS[i].y}
                  stroke={active ? "hsl(var(--rr-accent))" : "hsl(var(--rr-border))"}
                  strokeWidth={active ? 0.7 : 0.5}
                  strokeOpacity={hover ? (active ? 1 : 0.3) : 0.7}
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2 + i * 0.08 }}
                />
                {!reduce && (
                  <motion.circle
                    r="0.9"
                    fill="hsl(var(--rr-accent))"
                    initial={{ opacity: 0 }}
                    animate={{ cx: [50, POS[i].x], cy: [50, POS[i].y], opacity: [0, 0.55, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1 + i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* hub — centering lives on a static wrapper so Framer's animated
            transform (scale) doesn't clobber the -translate-1/2 that centres it */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 rounded-2xl border border-rr-border bg-rr-card px-4 py-3 shadow-md"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rr-accent text-white">
              <Rocket className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[13px] font-semibold text-rr-text">ResumeRocket</span>
          </motion.div>
        </div>

        {/* nodes */}
        {NODES.map((node, i) => {
          const Icon = node.icon;
          const dim = hover != null && hover !== node.key;
          return (
            <button
              key={node.key}
              type="button"
              onMouseEnter={() => setHover(node.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(node.key)}
              onBlur={() => setHover(null)}
              style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
              className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border bg-rr-card px-2.5 py-1.5 text-[11px] font-medium shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent ${
                hover === node.key
                  ? "border-rr-accent/50 text-rr-accent shadow-md"
                  : "border-rr-border-muted text-rr-text-secondary"
              } ${dim ? "opacity-50" : "opacity-100"}`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {node.label}
            </button>
          );
        })}
      </div>

      {/* ── mobile / tablet: vertical ecosystem ── */}
      <div className="lg:hidden">
        <div className="mx-auto flex w-fit flex-col items-center gap-1 rounded-2xl border border-rr-border bg-rr-card px-4 py-3 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rr-accent text-white">
            <Rocket className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-[13px] font-semibold text-rr-text">ResumeRocket</span>
        </div>
        <div className="mx-auto my-2 h-6 w-px bg-rr-border" aria-hidden />
        <ul className="grid grid-cols-2 gap-2">
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <li
                key={node.key}
                className="flex items-center gap-2 rounded-xl border border-rr-border-muted bg-rr-card px-3 py-2.5 text-[13px] font-medium text-rr-text-secondary"
              >
                <Icon className="h-4 w-4 shrink-0 text-rr-accent" aria-hidden />
                {node.label}
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
