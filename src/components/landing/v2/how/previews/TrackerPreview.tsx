"use client";

import { motion, useReducedMotion } from "framer-motion";

type Col = {
  name: string;
  dot: string;
  role: string;
  company: string;
  badge?: string;
  highlight?: boolean;
};

const COLUMNS: Col[] = [
  { name: "Applied", dot: "bg-rr-accent", role: "UI Engineer", company: "Globex" },
  {
    name: "Interview",
    dot: "bg-rr-info",
    role: "Frontend Engineer",
    company: "Acme Labs",
    badge: "Friday",
    highlight: true,
  },
  { name: "Offer", dot: "bg-rr-success", role: "Product Engineer", company: "Northwind" },
  { name: "Rejected", dot: "bg-rr-text-muted", role: "Web Developer", company: "Initech" },
];

/** Stage 6 — a mini kanban; the application cards slide into their columns. */
export function TrackerPreview() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLUMNS.map((col, i) => (
          <div key={col.name} className="rounded-lg bg-rr-bg-elevated p-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} aria-hidden />
              <span className="text-[11px] font-medium text-rr-text-secondary">{col.name}</span>
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: reduce ? 0 : 0.15 + i * 0.12,
                duration: 0.35,
                ease: [0.2, 0, 0, 1],
              }}
              className={`mt-2 rounded-md border bg-rr-card p-2 ${
                col.highlight
                  ? "border-rr-info/40 ring-1 ring-rr-info/20"
                  : "border-rr-border-muted"
              }`}
            >
              <p className="text-[12px] font-semibold leading-tight text-rr-text">{col.role}</p>
              <p className="text-[10px] text-rr-text-muted">{col.company}</p>
              {col.badge && (
                <span className="mt-1.5 inline-block rounded bg-rr-info/10 px-1.5 py-0.5 text-[10px] font-medium text-rr-info">
                  {col.badge}
                </span>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
