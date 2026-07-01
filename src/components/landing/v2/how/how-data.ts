/**
 * Content for the "how it works" section — the guided upload-to-interview
 * journey. Each stage carries a short name (for the rail tracker) and a
 * one-line caption (on the panel). Preview data lives inside each preview
 * component. Everything is illustrative example data.
 */

export const HOW_EYEBROW = "The workflow";
export const HOW_HEADLINE = "From upload to interview, one guided workflow";
export const HOW_SUBCOPY =
  "Upload your resume once. ResumeRocket analyzes it, suggests improvements, tailors it for each role, drafts personalized cover letters, and keeps every application organized.";

export type StageKey = "upload" | "parse" | "analysis" | "tailored" | "cover" | "tracker";

export type Stage = { key: StageKey; name: string; caption: string };

export const STAGES: Stage[] = [
  {
    key: "upload",
    name: "Upload resume",
    caption: "Add a PDF or DOCX — the only manual step.",
  },
  {
    key: "parse",
    name: "AI parsing",
    caption: "ResumeRocket reads it into structured sections.",
  },
  {
    key: "analysis",
    name: "Resume analysis",
    caption: "A grade, ATS score, and prioritized fixes.",
  },
  {
    key: "tailored",
    name: "Tailored resume",
    caption: "Reshape it for a specific role in one pass.",
  },
  {
    key: "cover",
    name: "Cover letter",
    caption: "A personalized draft built from your resume.",
  },
  {
    key: "tracker",
    name: "Application tracker",
    caption: "Follow every application from applied to offer.",
  },
];
