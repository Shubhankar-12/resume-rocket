import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Wand2,
  Mail,
  Github,
  KanbanSquare,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

/**
 * Data for the interactive product tour. Everything is illustrative
 * "Preview Workspace" content — never a real customer. `tabKey` links a
 * sidebar item to a tab; items without one are realistic-but-inert chrome.
 */

export const WORKSPACE = { label: "Preview Workspace", user: "Alex Johnson", initials: "AJ" };
export const CREDITS = { remaining: 42, total: 50 };

export type SidebarItem = { label: string; icon: LucideIcon; tabKey?: string };

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, tabKey: "dashboard" },
  { label: "Resume Library", icon: FolderOpen },
  { label: "Resume Analysis", icon: BarChart3, tabKey: "analysis" },
  { label: "Tailored Resume", icon: Wand2, tabKey: "tailored" },
  { label: "Cover Letters", icon: Mail, tabKey: "cover" },
  { label: "GitHub Analysis", icon: Github, tabKey: "github" },
  { label: "Application Tracker", icon: KanbanSquare, tabKey: "tracker" },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
];

export const DASHBOARD = {
  activity: [
    { label: "Analyzed Senior_Frontend_Resume.pdf", meta: "2m ago", tone: "accent" as const },
    { label: "Tailored resume for Product Engineer", meta: "1h ago", tone: "info" as const },
    { label: "Generated a cover letter", meta: "Today", tone: "success" as const },
  ],
  interview: { role: "Frontend Engineer", company: "Acme Labs", when: "Friday, 2:00 PM" },
  quickActions: ["Upload resume", "Tailor resume", "New cover letter"],
  health: [
    { label: "ATS compatibility", value: "Strong", ok: true },
    { label: "Contact details", value: "Complete", ok: true },
    { label: "Measurable impact", value: "Needs work", ok: false },
  ],
};

export const ANALYSIS = {
  ats: 87,
  grade: "A-",
  keyword: 82,
  suggestions: [
    "Add Docker to your skills",
    "Quantify achievements with metrics",
    "Tighten the summary section",
    "Add measurable impact to projects",
  ],
  resume: {
    name: "Senior_Frontend_Resume.pdf",
    lines: [
      { text: "Senior Frontend Engineer — 5 years building React apps", change: null },
      { text: "Frontend developer with experience in web apps", change: "weak" as const },
      {
        text: "Shipped an accessible design system used across 12 teams",
        change: "strong" as const,
      },
      { text: "Skills: React, TypeScript, Next.js", change: "add" as const },
    ],
  },
};

export const TAILORED = {
  job: "Senior Frontend Engineer",
  alignment: 92,
  original: "Frontend developer with experience building web applications and websites.",
  tailored:
    "Senior Frontend Engineer with 5 years shipping accessible, performant React apps used by thousands daily.",
  addedKeywords: ["Docker", "GraphQL", "Accessibility", "CI/CD"],
  changes: ["Improved summary", "Updated experience", "Role-aligned skills"],
};

export const COVER = {
  role: "Senior Frontend Engineer",
  words: 214,
  text: "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Engineer role. Over the past five years I've shipped accessible, performant React applications used by thousands of people every day, and I care deeply about the details that make an interface feel effortless.",
};

export type Repo = {
  name: string;
  stack: string[];
  relevance: "High" | "Medium" | "Low";
  bullet: string;
};

export const GITHUB: { repos: Repo[] } = {
  repos: [
    {
      name: "resume-rocket",
      stack: ["Next.js", "Express", "MongoDB", "TypeScript"],
      relevance: "High",
      bullet:
        "Built an AI-powered resume optimization platform using Next.js, Express, MongoDB, OpenAI APIs, and TypeScript.",
    },
    {
      name: "portfolio",
      stack: ["React", "Vite", "Tailwind"],
      relevance: "Medium",
      bullet:
        "Designed and shipped a personal portfolio with a custom, reusable component library.",
    },
    {
      name: "algo-notes",
      stack: ["Python"],
      relevance: "Low",
      bullet: "Maintained an annotated collection of algorithm solutions and study notes.",
    },
  ],
};

export type TrackerCard = { role: string; company: string; badge?: string };
export type TrackerColumn = {
  name: string;
  tone: "accent" | "info" | "success" | "muted";
  cards: TrackerCard[];
};

export const TRACKER: { columns: TrackerColumn[] } = {
  columns: [
    { name: "Applied", tone: "accent", cards: [{ role: "UI Engineer", company: "Globex" }] },
    {
      name: "Interview",
      tone: "info",
      cards: [{ role: "Frontend Engineer", company: "Acme Labs", badge: "Friday" }],
    },
    { name: "Offer", tone: "success", cards: [{ role: "Product Engineer", company: "Northwind" }] },
    { name: "Rejected", tone: "muted", cards: [{ role: "Web Developer", company: "Initech" }] },
  ],
};
