// All Part 2 demo content. Illustrative "Preview Workspace" data only —
// no real users, customers, statistics, or testimonials.

export type IconKey =
  "upload" | "sparkles" | "barchart" | "target" | "file" | "kanban" | "wand" | "send" | "github";

/* §3 Problem — see src/components/landing/v2/why/ (WhyResumesFail section) --- */

/* §4 How It Works — see src/components/landing/v2/how/ (HowItWorks section) - */

/* §5 Ecosystem ----------------------------------------------------------- */

export const ECOSYSTEM = [
  {
    title: "Resume Upload",
    body: "Store multiple resumes and organize them in one workspace.",
    preview: "upload",
  },
  {
    title: "Resume Analysis",
    body: "Understand ATS compatibility, keyword usage, and recruiter-focused improvements.",
    preview: "score",
  },
  {
    title: "Resume Tailoring",
    body: "Generate role-specific resumes using a target job description.",
    preview: "beforeafter",
  },
  {
    title: "Cover Letters",
    body: "Generate personalized cover letters instead of writing from scratch.",
    preview: "typing",
  },
  {
    title: "GitHub Analysis",
    body: "Turn repositories into recruiter-ready project descriptions.",
    preview: "repos",
  },
  {
    title: "Application Tracker",
    body: "Track every application from submission to offer.",
    preview: "kanban",
  },
  {
    title: "Credits",
    body: "Monitor available AI credits and usage.",
    preview: "progress",
  },
  {
    title: "Billing",
    body: "Manage subscriptions and purchase additional credits.",
    preview: "billing",
  },
] as const;

/* §6 Feature Deep Dive --------------------------------------------------- */

export const DEEP_DIVE = [
  {
    key: "analysis",
    title: "Resume Analysis",
    explanation:
      "Understand how your resume performs before submitting applications. ResumeRocket highlights strengths, identifies weak areas, and prioritizes improvements.",
    href: "/auth?next=/dashboard",
  },
  {
    key: "tailoring",
    title: "Resume Tailoring",
    explanation: "Generate resumes that better align with a specific job description.",
    href: "/auth?next=/dashboard",
  },
  {
    key: "cover",
    title: "Cover Letter Generator",
    explanation: "Generate personalized cover letters using your resume and the selected role.",
    href: "/auth?next=/dashboard",
  },
  {
    key: "github",
    title: "GitHub Project Analysis",
    explanation: "Transform technical repositories into concise achievements suitable for resumes.",
    href: "/auth?next=/dashboard",
  },
  {
    key: "tracker",
    title: "Application Tracker",
    explanation: "Keep every application organized throughout your job search.",
    href: "/auth?next=/dashboard",
  },
] as const;

/* §7 Interactive Demo ---------------------------------------------------- */

export const DEMO_TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "analysis", label: "Resume Analysis" },
  { key: "tailored", label: "Tailored Resume" },
  { key: "cover", label: "Cover Letter" },
  { key: "github", label: "GitHub" },
  { key: "tracker", label: "Tracker" },
] as const;

export const DEMO_DASHBOARD = {
  score: { ats: 87, grade: "A-" },
  credits: { used: 35, total: 100 },
  activity: [
    "Analyzed Senior_Frontend_Resume.pdf",
    "Generated a cover letter",
    "Tailored resume for Product Engineer",
  ],
  interview: { role: "Product Engineer · Northwind", when: "Tue, 2:00 PM" },
  quickActions: ["Upload resume", "Tailor resume", "New cover letter"],
} as const;

export const DEMO_ANALYSIS = {
  ats: 87,
  keyword: 82,
  suggestions: [
    "Improve React keywords",
    "Quantify achievements",
    "Reduce passive voice",
    "Tailor summary",
  ],
} as const;

export const DEMO_TAILORED = {
  job: "Senior Frontend Engineer",
  matching: 14,
  missing: 3,
  missingSkills: ["GraphQL", "Webpack", "Accessibility testing"],
  generated: "Senior Frontend Engineer with 5 years building accessible, performant React apps…",
} as const;

export const DEMO_COVER = {
  text:
    "Dear Hiring Manager, I'm excited to apply for the Senior Frontend role. " +
    "Over the past five years I've shipped accessible, performant React applications " +
    "used by thousands of people every day.",
  words: 32,
} as const;

export const DEMO_GITHUB = {
  repos: [
    {
      name: "resume-rocket",
      stack: ["Next.js", "TypeScript", "MongoDB"],
      relevance: "High",
      bullet:
        "Built an AI-powered resume optimization platform using Next.js, TypeScript, Express, MongoDB, and OpenAI APIs.",
    },
    {
      name: "portfolio",
      stack: ["React", "Vite"],
      relevance: "Medium",
      bullet: "Designed and shipped a personal portfolio with a custom component library.",
    },
    {
      name: "algo-notes",
      stack: ["Python"],
      relevance: "Low",
      bullet: "Maintained a collection of annotated algorithm solutions and notes.",
    },
  ],
} as const;

export const DEMO_TRACKER = {
  columns: [
    { column: "Applied", cards: ["Frontend Engineer · Acme"] },
    { column: "Interview", cards: ["Product Engineer · Northwind"] },
    { column: "Offer", cards: ["UI Engineer · Globex"] },
    { column: "Rejected", cards: ["Web Developer · Initech"] },
  ],
  counts: { Applied: 6, Interview: 2, Offer: 1, Rejected: 3 },
} as const;

/* §8 Workflow — removed; the journey now lives in the HowItWorks section --- */
