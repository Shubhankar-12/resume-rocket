export type Feature = {
  id: string;
  stage: "write" | "grade" | "tailor" | "cover-letter" | "track";
  title: string;
  description: string;
  iconName: "FileText" | "Gauge" | "Wand2" | "Mail" | "Kanban" | "Github" | "Sparkles";
};

export const FEATURES: Feature[] = [
  {
    id: "instant-grade",
    stage: "grade",
    title: "Instant grading",
    description: "Score + line-by-line feedback in 30 seconds.",
    iconName: "Gauge",
  },
  {
    id: "ats-analysis",
    stage: "grade",
    title: "ATS analysis",
    description: "We test your resume the way real applicant-tracking systems do.",
    iconName: "Sparkles",
  },
  {
    id: "tailored-resumes",
    stage: "tailor",
    title: "Tailored to the job",
    description: "Paste a JD, get a resume rewritten for that specific role.",
    iconName: "Wand2",
  },
  {
    id: "cover-letters",
    stage: "cover-letter",
    title: "Cover letters that don't sound like AI",
    description: "Personalised, role-specific, under 60 seconds.",
    iconName: "Mail",
  },
  {
    id: "github-projects",
    stage: "write",
    title: "Pull projects from GitHub",
    description: "Skip retyping. We generate strong project bullets from your repos.",
    iconName: "Github",
  },
  {
    id: "application-tracker",
    stage: "track",
    title: "Application tracker",
    description: "Kanban board to track every application — no spreadsheets.",
    iconName: "Kanban",
  },
  {
    id: "starter-resume",
    stage: "write",
    title: "Start from a strong base",
    description: "Templates that follow what recruiters actually want to see.",
    iconName: "FileText",
  },
];

export const STAGE_TITLES: Record<Feature["stage"], string> = {
  write: "Write",
  grade: "Grade",
  tailor: "Tailor",
  "cover-letter": "Cover letters",
  track: "Track",
};

export const STAGE_ORDER: Feature["stage"][] = [
  "write",
  "grade",
  "tailor",
  "cover-letter",
  "track",
];
