export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export const FEATURE_CHIPS = [
  "ATS Analysis",
  "Resume Tailoring",
  "Cover Letters",
  "GitHub Analysis",
  "Application Tracker",
] as const;

export const TRUST_NOTES = [
  "Supports PDF & DOCX",
  "GitHub Login Available",
  "Secure Payments",
  "Privacy First",
] as const;

export const UPLOAD_DEMO = { fileName: "Senior_Frontend_Resume.pdf" } as const;

export const SCORE_DEMO = {
  grade: "A-",
  ats: 87,
  keyword: 82,
  label: "Example Analysis",
} as const;

export const SUGGESTIONS_DEMO = [
  "Improve React keywords",
  "Quantify achievements",
  "Reduce passive voice",
  "Tailor summary",
] as const;

export const COVER_LETTER_DEMO = {
  text:
    "Dear Hiring Manager, I'm excited to apply for the Senior Frontend role. " +
    "Over the past five years I've shipped accessible, performant React applications " +
    "used by thousands of people every day.",
  label: "Generated Example",
} as const;

export const GITHUB_DEMO = {
  repo: "resume-rocket",
  relevance: "High",
  bullet:
    "Built an AI-powered resume optimization platform using Next.js, TypeScript, " +
    "Express, MongoDB, and OpenAI APIs.",
  label: "Generated Example",
} as const;

export const TRACKER_DEMO = [
  { column: "Applied", card: "Frontend Engineer · Acme" },
  { column: "Interview", card: "Product Engineer · Northwind" },
  { column: "Offer", card: "UI Engineer · Globex" },
  { column: "Rejected", card: "Web Developer · Initech" },
] as const;
