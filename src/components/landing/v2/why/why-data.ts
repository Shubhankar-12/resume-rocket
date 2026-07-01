import { FileText, KeyRound, TrendingUp, ListChecks, type LucideIcon } from "lucide-react";

/**
 * Content for the "why resumes fail" section. Educational, not promotional —
 * every line explains a real mechanic of modern hiring in plain language.
 */

export const WHY_EYEBROW = "Before you apply";
export const WHY_HEADLINE = "Why great candidates never hear back";

export const WHY_INTRO = [
  "Most applications are read by software before a person ever sees them. An applicant tracking system scans for keywords and structure, then ranks you against everyone else who applied.",
  "Small, fixable things — a missing keyword, a layout the parser can't read, the same resume sent to every role — quietly push strong candidates down the list.",
];

export const WHY_TAKEAWAY =
  "ResumeRocket finds these issues before you apply, so a strong candidate isn't filtered out by a fixable mistake.";

export const PIPELINE_CAPTION = "How an application moves — and where it stalls";

export type PipelineStage = {
  key: string;
  label: string;
  desc: string;
  /** Where applications commonly drop off at this stage. Empty = no filter here. */
  dropoffs: string[];
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    key: "resume",
    label: "Resume submitted",
    desc: "You send your application into the queue.",
    dropoffs: [],
  },
  {
    key: "ats",
    label: "ATS screening",
    desc: "Software scans for keywords and structure.",
    dropoffs: ["Missing keywords", "Formatting the parser can't read"],
  },
  {
    key: "recruiter",
    label: "Recruiter review",
    desc: "A person skims the shortlist for relevance.",
    dropoffs: ["Generic summary", "Weak project descriptions", "No measurable impact"],
  },
  {
    key: "interview",
    label: "Interview",
    desc: "You make your case in person.",
    dropoffs: [],
  },
  {
    key: "offer",
    label: "Offer",
    desc: "The outcome you were working toward.",
    dropoffs: [],
  },
];

export type Insight = { icon: LucideIcon; title: string; body: string };

export const INSIGHTS: Insight[] = [
  {
    icon: FileText,
    title: "Generic resume",
    body: "Sending the same resume everywhere lowers how relevant each application looks.",
  },
  {
    icon: KeyRound,
    title: "Missing keywords",
    body: "Skills the job description asks for may never appear in your resume.",
  },
  {
    icon: TrendingUp,
    title: "Weak project descriptions",
    body: "Projects often say what you built, not the impact it had.",
  },
  {
    icon: ListChecks,
    title: "Application tracking",
    body: "Managing many applications by hand gets harder as they add up.",
  },
];
