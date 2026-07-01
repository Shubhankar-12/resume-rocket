import {
  HelpCircle,
  Gauge,
  Mail,
  Github,
  CreditCard,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * FAQ content for the knowledge-center section. Every answer describes a
 * capability that actually ships today (verified against the dashboard) — no
 * invented features, no future promises, no marketing language.
 */

export type FaqCategoryId = "general" | "analysis" | "cover" | "github" | "billing" | "privacy";

export interface FaqCategory {
  id: FaqCategoryId;
  title: string;
  icon: LucideIcon;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: "general", title: "General", icon: HelpCircle },
  { id: "analysis", title: "Resume Analysis", icon: Gauge },
  { id: "cover", title: "Cover Letters", icon: Mail },
  { id: "github", title: "GitHub Analysis", icon: Github },
  { id: "billing", title: "Credits & Billing", icon: CreditCard },
  { id: "privacy", title: "Privacy & Security", icon: ShieldCheck },
];

export interface FaqItem {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  // ── General ──────────────────────────────────────────────────────────────
  {
    id: "formats",
    category: "general",
    question: "What file formats are supported?",
    answer:
      "You can upload resumes as PDF or DOCX. Analyses, tailored resumes, and cover letters are exported as PDF.",
  },
  {
    id: "multiple-resumes",
    category: "general",
    question: "Can I upload multiple resumes?",
    answer:
      "Yes. You can upload and keep multiple resumes in one workspace, and each keeps its own analysis history so you can compare versions.",
  },
  {
    id: "need-jd",
    category: "general",
    question: "Do I need a job description?",
    answer:
      "No. You can analyze a resume on its own to get an ATS score, a letter grade, and improvement suggestions. A job description is only needed when you want to tailor a resume to a specific role.",
  },

  // ── Resume Analysis ────────────────────────────────────────────────────────
  {
    id: "ats-score",
    category: "analysis",
    question: "How is the ATS score calculated?",
    answer:
      "The ATS score estimates how cleanly an applicant-tracking system can read and rank your resume, based on keyword coverage, parseable formatting, and structure. A higher score means fewer reasons for a system to filter you out before a person reads it.",
  },
  {
    id: "letter-grade",
    category: "analysis",
    question: "What does the letter grade mean?",
    answer:
      "The letter grade is an at-a-glance summary of overall resume strength. It combines factors like clarity, measurable impact, and ATS-readiness into a single rating so you can quickly gauge where a resume stands.",
  },
  {
    id: "suggestions",
    category: "analysis",
    question: "How are improvement suggestions generated?",
    answer:
      "ResumeRocket reviews your resume against what recruiters and ATS software look for, then returns a prioritized list of specific, section-level suggestions. Each one points to a concrete change you can make rather than generic advice.",
  },

  // ── Cover Letters ──────────────────────────────────────────────────────────
  {
    id: "cover-edit",
    category: "cover",
    question: "Can I edit generated cover letters?",
    answer:
      "Yes. Every generated cover letter opens in an editor where you can revise the wording before downloading it as a PDF.",
  },
  {
    id: "cover-versions",
    category: "cover",
    question: "Can I generate multiple versions?",
    answer:
      "Yes. You can generate as many cover letters as your credits allow — for different roles or different framings — and each is saved separately in your workspace.",
  },

  // ── GitHub Analysis ────────────────────────────────────────────────────────
  {
    id: "github-how",
    category: "github",
    question: "How does GitHub project analysis work?",
    answer:
      "After you connect your GitHub account, ResumeRocket reviews your repositories and turns the projects you choose into concise, resume-ready bullet points, each with a relevance indicator to help you decide what to feature.",
  },
  {
    id: "github-select",
    category: "github",
    question: "Can I choose which repositories are analyzed?",
    answer:
      "Yes. You select which repositories to analyze — nothing from your GitHub account is added to your resume automatically.",
  },

  // ── Credits & Billing ──────────────────────────────────────────────────────
  {
    id: "credits-used",
    category: "billing",
    question: "How are AI credits used?",
    answer:
      "Each AI action — a resume analysis, a tailored resume, a cover letter, or a GitHub analysis — spends credits. Your current balance is always visible in the dashboard.",
  },
  {
    id: "credits-expire",
    category: "billing",
    question: "Do purchased credit packs expire?",
    answer:
      "No. Purchased credit packs never expire and stay in your account until you use them. Monthly plan credits are separate and reset at the start of each billing cycle.",
  },
  {
    id: "run-out",
    category: "billing",
    question: "What happens when I run out of credits?",
    answer:
      "You can buy a one-time credit pack or upgrade your plan for more monthly credits. Your saved resumes, analyses, and documents stay available either way.",
  },
  {
    id: "payment",
    category: "billing",
    question: "How is payment handled?",
    answer:
      "Payments are processed by Razorpay for INR and Stripe for USD. ResumeRocket never stores your card details.",
  },
  {
    id: "cancel",
    category: "billing",
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel anytime from billing settings, and access continues until the end of the current billing period.",
  },

  // ── Privacy & Security ─────────────────────────────────────────────────────
  {
    id: "who-access",
    category: "privacy",
    question: "Who can access my resume?",
    answer:
      "Only you. Your resumes are private to your account, sent over encrypted connections, and never used to train any AI model.",
  },
  {
    id: "delete-resumes",
    category: "privacy",
    question: "Can I delete my uploaded resumes?",
    answer:
      "Yes. You can delete any resume from your workspace at any time. You can also permanently delete your entire account and all associated data from settings.",
  },
];
