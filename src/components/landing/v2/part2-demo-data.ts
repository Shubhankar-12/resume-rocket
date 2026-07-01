// All Part 2 demo content. Illustrative "Preview Workspace" data only —
// no real users, customers, statistics, or testimonials.

/* §3 Problem — see v2/why/ · §4 How It Works — see v2/how/
   §5 Ecosystem / §6 Feature Deep Dive — replaced by v2/workspace/ ---------- */

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
