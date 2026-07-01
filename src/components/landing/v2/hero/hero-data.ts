import {
  LayoutDashboard,
  FileText,
  Wand2,
  Mail,
  Github,
  KanbanSquare,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

/**
 * All content for the hero product preview. Everything here is clearly labelled
 * example data — the workspace is fictional ("Alex Johnson / Example Workspace")
 * so the preview reads as a demo, never as a real account.
 */

export const HERO_HEADLINE = {
  lead: "Land more interviews with",
  accent: "AI that actually reads",
  trail: "your resume",
} as const;

export const HERO_SUBCOPY =
  "Upload your resume once and get ATS analysis, recruiter-ready feedback, tailored versions, cover letters, GitHub project insights, and application tracking — all in one workspace.";

export const HERO_CHIPS = [
  "ATS Analysis",
  "Resume Tailoring",
  "Cover Letters",
  "GitHub Analysis",
  "Application Tracker",
] as const;

export const HERO_TRUST = [
  "Free to start",
  "No credit card",
  "PDF & DOCX",
  "GitHub sign-in",
] as const;

export type SidebarItem = { label: string; icon: LucideIcon; active?: boolean };

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Resume Library", icon: FileText },
  { label: "Tailored Resume", icon: Wand2 },
  { label: "Cover Letters", icon: Mail },
  { label: "GitHub", icon: Github },
  { label: "Tracker", icon: KanbanSquare },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
];

export const WORKSPACE = {
  user: "Alex Johnson",
  firstName: "Alex",
  plan: "Free plan",
  workspace: "Example Workspace",
  initials: "AJ",
} as const;

export const SCORE = {
  grade: "A-",
  atsLabel: "ATS Score",
  ats: 87,
  keywordLabel: "Keyword Match",
  keyword: 82,
} as const;

export const CREDITS = { remaining: 42, total: 50 } as const;

export const SUGGESTIONS = [
  "Quantify achievements with metrics",
  "Add Docker to your skills",
  "Tighten the summary section",
] as const;

export const ACTIVITY = [
  { label: "Resume uploaded", meta: "2 min ago", tone: "accent" as const },
  { label: "Tailored resume generated", meta: "1 hr ago", tone: "info" as const },
  { label: "Cover letter completed", meta: "Today", tone: "success" as const },
];

export const PIPELINE = [
  { stage: "Applied", count: 12, tone: "accent" as const },
  { stage: "Interview", count: 3, tone: "info" as const },
  { stage: "Offer", count: 1, tone: "success" as const },
];

export const INTERVIEW = {
  role: "Frontend Engineer",
  company: "Northwind",
  day: "Friday",
  time: "2:00 PM",
} as const;
