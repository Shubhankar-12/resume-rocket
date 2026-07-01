"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMPROVED, SECTION_LABELS, slideIn, type SectionKey } from "./transformation-data";
import { Highlight } from "./HighlightAnimation";

/**
 * A resume section that can be spotlighted from the sidebar. When `active`
 * matches its key, a green ring links it to the hovered recommendation;
 * hovering the section itself reports back so the recommendation lights up too.
 */
function DocSection({
  sectionKey,
  active,
  onHover,
  children,
}: {
  sectionKey: SectionKey;
  active: SectionKey | null;
  onHover: (key: SectionKey | null) => void;
  children: React.ReactNode;
}) {
  const isActive = active === sectionKey;
  return (
    <section
      onMouseEnter={() => onHover(sectionKey)}
      onMouseLeave={() => onHover(null)}
      data-active={isActive}
      className={cn(
        "-mx-2.5 mt-4 rounded-lg px-2.5 py-2 transition-colors duration-300 first:mt-0",
        isActive ? "bg-rr-success/[0.06] ring-1 ring-rr-success/40" : "ring-1 ring-transparent"
      )}
    >
      <h4 className="border-b border-rr-border-muted pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-rr-text-muted">
        {SECTION_LABELS[sectionKey]}
      </h4>
      <div className="mt-2.5 text-[13px] leading-relaxed text-rr-text">{children}</div>
    </section>
  );
}

export function ImprovedResume({
  active,
  onSectionHover,
}: {
  active: SectionKey | null;
  onSectionHover: (key: SectionKey | null) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const addedSkills = new Set(IMPROVED.addedSkills);
  // Reveal every inner change once the card enters view, so nothing low in the
  // document can be stranded invisible by its own viewport threshold.
  const ref = useRef<HTMLElement>(null);
  const revealed = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      variants={slideIn(reduce, 0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative rounded-xl border border-rr-success/25 bg-rr-card p-6 shadow-xl ring-1 ring-rr-success/5 md:p-7"
      aria-label="Sample resume, after improvements"
    >
      {/* document header */}
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-rr-text">{IMPROVED.name}</p>
          <p className="text-[13px] font-medium text-rr-text-secondary">{IMPROVED.role}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-rr-success/30 bg-rr-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-rr-success">
          <Check className="h-3 w-3" aria-hidden />
          {IMPROVED.label}
        </span>
      </header>

      <div className="mt-6">
        <DocSection sectionKey="summary" active={active} onHover={onSectionHover}>
          <Highlight delay={0.35} revealed={revealed}>
            {IMPROVED.summary}
          </Highlight>
        </DocSection>

        <DocSection sectionKey="experience" active={active} onHover={onSectionHover}>
          <ul className="space-y-1.5">
            {IMPROVED.experience.map((line, i) => (
              <li key={line} className="flex gap-2">
                <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-rr-success" aria-hidden />
                <span>
                  <Highlight delay={0.45 + i * 0.12} revealed={revealed}>
                    {line}
                  </Highlight>
                </span>
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection sectionKey="projects" active={active} onHover={onSectionHover}>
          {IMPROVED.projects.map((p) => (
            <div key={p.name}>
              <p className="font-medium text-rr-text">{p.name}</p>
              <p className="mt-0.5 text-rr-text-secondary">
                <Highlight delay={0.85} revealed={revealed}>
                  {p.desc}
                </Highlight>
              </p>
            </div>
          ))}
        </DocSection>

        <DocSection sectionKey="skills" active={active} onHover={onSectionHover}>
          <div className="flex flex-wrap gap-1.5">
            {IMPROVED.skills.map((skill, i) => {
              const added = addedSkills.has(skill);
              return added ? (
                <motion.span
                  key={skill}
                  initial={false}
                  animate={
                    reduce || revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    delay: reduce ? 0 : 0.9 + i * 0.06,
                    ease: [0.2, 0, 0, 1],
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-rr-success/30 bg-rr-success/10 px-2 py-0.5 text-[12px] font-medium text-rr-success"
                >
                  <span className="sr-only">Added: </span>
                  <Check className="h-3 w-3" aria-hidden />
                  {skill}
                </motion.span>
              ) : (
                <span
                  key={skill}
                  className="rounded-md border border-rr-border bg-rr-bg px-2 py-0.5 text-[12px] text-rr-text-secondary"
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </DocSection>
      </div>
    </motion.article>
  );
}
