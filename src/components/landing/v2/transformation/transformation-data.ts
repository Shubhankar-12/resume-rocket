import type { Variants } from "framer-motion";

/**
 * Content + motion primitives for the "See what changes" transformation
 * section. Everything here is DEMONSTRATION data — a fictional sample resume
 * shown before and after the kinds of edits ResumeRocket can recommend. No
 * real people, no success rates, no product metrics. The numbers inside the
 * "after" resume (e.g. "72 to 95") are part of the sample resume's own content.
 */

export const HEADING = {
  eyebrow: "Before / after",
  titleLead: "See what changes.",
  titleAccent: "Small improvements, big difference.",
  intro:
    "ResumeRocket highlights opportunities to improve clarity, keyword relevance, and recruiter readability. The examples below illustrate the kinds of changes the platform can recommend.",
};

/** The four sections both resumes share — used to link the checklist to the paper. */
export type SectionKey = "summary" | "experience" | "projects" | "skills";

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
};

/** The "before" resume — plainly worded, generic, no measurable impact. */
export const ORIGINAL = {
  label: "Example · Before",
  name: "Alex Morgan",
  role: "Frontend Developer",
  summary: "Frontend developer passionate about React and JavaScript.",
  experience: ["Built websites for clients."],
  projects: [{ name: "E-commerce Website", desc: "" }],
  skills: ["React", "Node", "CSS", "TypeScript"],
  /** Shown as a muted footnote, not diff annotations. */
  shortfalls: ["Generic summary", "No measurable impact", "Missing keywords"],
};

/** The "after" resume — same person, stronger phrasing. `added` marks what's new. */
export const IMPROVED = {
  label: "Example · After",
  name: "Alex Morgan",
  role: "Frontend Engineer",
  summary:
    "Frontend Engineer with 3+ years building scalable React, Next.js, and TypeScript applications focused on performance and user experience.",
  experience: [
    "Improved Lighthouse performance from 72 to 95.",
    "Reduced bundle size by 28%.",
    "Developed a reusable component library.",
  ],
  projects: [
    {
      name: "ResumeRocket",
      desc: "AI-powered SaaS platform for resume optimization.",
    },
  ],
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Docker", "AWS"],
  /** Skills that didn't exist (or were vaguer) in the original — get the green treatment. */
  addedSkills: ["Next.js", "Node.js", "Tailwind CSS", "Docker", "AWS"],
};

/** Each recommendation points at the section it changed, so hovering links the two. */
export type Improvement = { id: string; label: string; target: SectionKey };

export const IMPROVEMENTS: Improvement[] = [
  { id: "achievements", label: "Added measurable achievements", target: "experience" },
  { id: "readability", label: "Improved recruiter readability", target: "summary" },
  { id: "tech", label: "Added relevant technologies", target: "skills" },
  { id: "projects", label: "Strengthened project descriptions", target: "projects" },
  { id: "keywords", label: "Better keyword alignment", target: "skills" },
];

/* ---------------------------------------------------------------- motion --- */

/** A block that fades and rises into place. `delay` sequences the three panels. */
export const rise = (reduce: boolean, delay = 0): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1], delay: reduce ? 0 : delay },
  },
});

/** The improved resume slides in from the side, as if replacing the original. */
export const slideIn = (reduce: boolean, delay = 0): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1], delay: reduce ? 0 : delay },
  },
});

/** Container that staggers the checklist ticks. */
export const checklist = (reduce: boolean): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: reduce ? 0 : 0.55, staggerChildren: reduce ? 0 : 0.09 } },
});

export const checkItem = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
});
