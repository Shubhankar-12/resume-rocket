import {
  BarChart3,
  Wand2,
  Mail,
  Github,
  KanbanSquare,
  CreditCard,
  FileCheck,
  RefreshCw,
  Sparkles,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the "everything in one workspace" section. The story is
 * integration and continuity — one connected system, not a list of features.
 */

export const EYEBROW = "Integrated by design";
export const HEADLINE = { lead: "Everything you need.", accent: "One workspace." };
export const SUBCOPY =
  "Most job seekers bounce between ATS checkers, resume builders, cover-letter generators, spreadsheets, and notes. ResumeRocket keeps it all connected — from resume analysis to interview tracking — so you always work from the same source of truth.";

/** The six capabilities that orbit the ResumeRocket hub. */
export type Node = { key: string; label: string; icon: LucideIcon };

export const NODES: Node[] = [
  { key: "analysis", label: "Resume Analysis", icon: BarChart3 },
  { key: "tailored", label: "Tailored Resume", icon: Wand2 },
  { key: "cover", label: "Cover Letter", icon: Mail },
  { key: "github", label: "GitHub Analysis", icon: Github },
  { key: "tracker", label: "Application Tracker", icon: KanbanSquare },
  { key: "billing", label: "Credits & Billing", icon: CreditCard },
];

/** The scattered, multi-tool way people do it today. */
export const TRADITIONAL = {
  title: "The usual way",
  steps: [
    "Run an ATS checker",
    "Copy the results",
    "Open ChatGPT",
    "Rewrite the resume",
    "Open a cover-letter tool",
    "Copy everything again",
    "Update a spreadsheet",
    "Track applications by hand",
  ],
  summary: "8 steps · 5 disconnected tools",
};

/** The same job, in one place. */
export const RESUMEROCKET = {
  title: "With ResumeRocket",
  steps: [
    "Upload your resume",
    "AI analysis",
    "Improve the resume",
    "Tailor it for a job",
    "Generate a cover letter",
    "Track applications",
    "Done",
  ],
  summary: "1 workspace · nothing to copy",
};

export type Benefit = { icon: LucideIcon; title: string; body: string };

export const BENEFITS: Benefit[] = [
  {
    icon: FileCheck,
    title: "Single source of truth",
    body: "Every feature works from the same resume.",
  },
  {
    icon: RefreshCw,
    title: "No repeated work",
    body: "Update your resume once and reuse it everywhere.",
  },
  {
    icon: Sparkles,
    title: "Context-aware AI",
    body: "Generated content builds on your resume instead of starting from scratch.",
  },
  {
    icon: FolderKanban,
    title: "Organized job search",
    body: "Keep resumes, applications, and documents in one place.",
  },
];
