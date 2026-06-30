// All Part 2 demo content. Illustrative "Preview Workspace" data only —
// no real users, customers, statistics, or testimonials.

export type IconKey =
  | "upload"
  | "sparkles"
  | "barchart"
  | "target"
  | "file"
  | "kanban"
  | "wand"
  | "send"
  | "github";

/* §3 Problem ------------------------------------------------------------- */

export const PIPELINE_NODES = [
  { label: "Resume", reject: "Missing keywords or formatting issues" },
  { label: "ATS Screening", reject: "Generic resume not tailored to the role" },
  { label: "Recruiter Review", reject: "Weak project descriptions, no measurable impact" },
  { label: "Interview", reject: undefined },
  { label: "Offer", reject: undefined },
] as const;

export const PROBLEM_CARDS = [
  {
    title: "Generic Resume",
    body: "Using the same resume for every application often reduces relevance.",
  },
  {
    title: "Missing Keywords",
    body: "Important skills from the job description may never appear in the resume.",
  },
  {
    title: "Weak Project Descriptions",
    body: "Projects explain what was built but not why it mattered.",
  },
  {
    title: "Application Chaos",
    body: "Tracking multiple applications manually becomes difficult over time.",
  },
] as const;

/* §4 How It Works -------------------------------------------------------- */

export const HOW_STEPS = [
  {
    n: 1,
    title: "Upload Resume",
    icon: "upload" as IconKey,
    desc: "Upload a PDF or DOCX resume securely.",
    preview: { kind: "upload", file: "Senior_Frontend_Resume.pdf", status: "Uploaded" },
  },
  {
    n: 2,
    title: "AI Resume Parsing",
    icon: "sparkles" as IconKey,
    desc: "ResumeRocket extracts structured information including experience, education, skills, projects, and contact information.",
    preview: { kind: "parse", experience: 5, skills: 22, projects: 8 },
  },
  {
    n: 3,
    title: "Resume Analysis",
    icon: "barchart" as IconKey,
    desc: "Receive a detailed report including ATS score, letter grade, keyword match, and priority improvements.",
    preview: { kind: "score", grade: "A-", ats: 87 },
  },
  {
    n: 4,
    title: "Tailor Resume",
    icon: "target" as IconKey,
    desc: "Paste a job description and identify missing skills, strengths, and improvement opportunities.",
    preview: { kind: "tailor", matching: 14, missing: 3 },
  },
  {
    n: 5,
    title: "Generate Cover Letter",
    icon: "file" as IconKey,
    desc: "Generate a personalized cover letter using your resume and target role.",
    preview: { kind: "cover", text: "Dear Hiring Manager, I'm excited to apply…" },
  },
  {
    n: 6,
    title: "Track Applications",
    icon: "kanban" as IconKey,
    desc: "Keep applications organized throughout your job search.",
    preview: { kind: "track", columns: ["Applied", "Interview", "Offer", "Rejected"] },
  },
] as const;

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

/* §8 Workflow ------------------------------------------------------------ */

export const WORKFLOW_STEPS = [
  {
    title: "Upload Resume",
    icon: "upload" as IconKey,
    note: "Add a PDF or DOCX to your workspace.",
  },
  {
    title: "Analyze Resume",
    icon: "barchart" as IconKey,
    note: "Get an ATS score and a prioritized report.",
  },
  {
    title: "Improve Resume",
    icon: "wand" as IconKey,
    note: "Apply the highest-impact suggestions.",
  },
  {
    title: "Tailor Resume",
    icon: "target" as IconKey,
    note: "Match the resume to a specific job description.",
  },
  {
    title: "Generate Cover Letter",
    icon: "file" as IconKey,
    note: "Draft a personalized letter for the role.",
  },
  { title: "Apply", icon: "send" as IconKey, note: "Submit with a resume built for the role." },
  {
    title: "Track Progress",
    icon: "kanban" as IconKey,
    note: "Follow each application to its outcome.",
  },
] as const;
