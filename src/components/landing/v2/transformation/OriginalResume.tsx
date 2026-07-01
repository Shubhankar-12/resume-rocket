"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ORIGINAL, rise } from "./transformation-data";

/** Small uppercase section heading with a hairline rule, like a printed resume. */
function DocSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 first:mt-0">
      <h4 className="border-b border-rr-border-muted pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-rr-text-muted">
        {label}
      </h4>
      <div className="mt-2.5 text-[13px] leading-relaxed text-rr-text-secondary">{children}</div>
    </section>
  );
}

/**
 * The "before" resume: real-looking sample content that reads as generic —
 * weak bullet, no metrics, thin skill list. Styled muted so the eye reads it
 * as the lesser of the two the instant both are on screen.
 */
export function OriginalResume() {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.article
      variants={rise(reduce, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative rounded-xl border border-rr-border bg-rr-card p-6 shadow-md md:p-7"
      aria-label="Sample resume, before"
    >
      {/* document header */}
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-rr-text">{ORIGINAL.name}</p>
          <p className="text-[13px] text-rr-text-muted">{ORIGINAL.role}</p>
        </div>
        <span className="shrink-0 rounded-full border border-rr-border bg-rr-bg px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-rr-text-muted">
          {ORIGINAL.label}
        </span>
      </header>

      <div className="mt-6">
        <DocSection label="Summary">{ORIGINAL.summary}</DocSection>

        <DocSection label="Experience">
          <ul className="list-disc space-y-1 pl-4 marker:text-rr-text-muted/50">
            {ORIGINAL.experience.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </DocSection>

        <DocSection label="Projects">
          {ORIGINAL.projects.map((p) => (
            <p key={p.name}>{p.name}</p>
          ))}
        </DocSection>

        <DocSection label="Skills">
          <div className="flex flex-wrap gap-1.5">
            {ORIGINAL.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-rr-border-muted bg-rr-bg px-2 py-0.5 text-[12px] text-rr-text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </DocSection>
      </div>

      {/* muted footnote — the honest "why it falls short", not diff annotations */}
      <footer className="mt-6 border-t border-rr-border-muted pt-3">
        <p className="text-[11px] leading-relaxed text-rr-text-muted">
          <span className="font-medium">Where it falls short — </span>
          {ORIGINAL.shortfalls.join(" · ")}
        </p>
      </footer>
    </motion.article>
  );
}
