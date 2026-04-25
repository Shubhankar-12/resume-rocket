export type ComparisonRow = {
  id: string;
  feature: string;
  resumerocket: boolean | string;
  chatgpt: boolean | string;
  resumeWorded: boolean | string;
  hiringCoach: boolean | string;
};

export const COMPETITORS = [
  { id: "resumerocket", label: "ResumeRocket", highlight: true },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "resumeWorded", label: "Resume Worded" },
  { id: "hiringCoach", label: "Hiring a coach" },
] as const;

export const COMPARISON: ComparisonRow[] = [
  {
    id: "cost",
    feature: "Cost",
    resumerocket: "Free + ₹/$ from low",
    chatgpt: "Free / Plus",
    resumeWorded: "$$/mo",
    hiringCoach: "$$$ one-off",
  },
  {
    id: "instant",
    feature: "Instant feedback",
    resumerocket: true,
    chatgpt: true,
    resumeWorded: true,
    hiringCoach: false,
  },
  {
    id: "ats",
    feature: "ATS analysis",
    resumerocket: true,
    chatgpt: false,
    resumeWorded: true,
    hiringCoach: false,
  },
  {
    id: "tailored",
    feature: "Tailored versions for each job",
    resumerocket: true,
    chatgpt: "Manual",
    resumeWorded: false,
    hiringCoach: true,
  },
  {
    id: "cover",
    feature: "Cover letters",
    resumerocket: true,
    chatgpt: "Manual",
    resumeWorded: false,
    hiringCoach: true,
  },
  {
    id: "tracker",
    feature: "Application tracker",
    resumerocket: true,
    chatgpt: false,
    resumeWorded: false,
    hiringCoach: false,
  },
];
