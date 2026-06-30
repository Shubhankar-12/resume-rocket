export type FaqCategory =
  | "General"
  | "Resume Analysis"
  | "Credits"
  | "Billing"
  | "Privacy"
  | "GitHub";

export const FAQ_CATEGORIES: FaqCategory[] = [
  "General",
  "Resume Analysis",
  "Credits",
  "Billing",
  "Privacy",
  "GitHub",
];

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

// Answers describe actual product capabilities only — no future promises.
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "formats",
    category: "General",
    question: "What file formats are supported?",
    answer: "PDF and DOCX for upload. Exports go out as PDF.",
  },
  {
    id: "multiple-resumes",
    category: "General",
    question: "Can I manage multiple resumes?",
    answer: "Yes. You can store and organize multiple resumes in one workspace.",
  },
  {
    id: "how-analysis",
    category: "Resume Analysis",
    question: "How does resume analysis work?",
    answer:
      "ResumeRocket parses your resume and grades it against what recruiters and applicant-tracking systems actually look for — keyword coverage, parseable formatting, and measurable impact. You get a letter grade, an ATS score, and a prioritized list of improvements.",
  },
  {
    id: "ats-score",
    category: "Resume Analysis",
    question: "What is an ATS score?",
    answer:
      "An ATS score estimates how well your resume passes automated applicant-tracking screening, based on keyword coverage, parseable formatting, and structure. A higher score means fewer reasons for a system to filter you out before a human reads it.",
  },
  {
    id: "tailor-multiple",
    category: "Resume Analysis",
    question: "Can I tailor multiple resumes?",
    answer:
      "Yes. Paste a job description and ResumeRocket tailors a version for that role while preserving your real experience — it doesn't fabricate. You can tailor as many versions as your credits allow.",
  },
  {
    id: "credits-used",
    category: "Credits",
    question: "How are AI credits used?",
    answer:
      "Each AI action — a resume analysis, a tailored resume, a cover letter, or a GitHub analysis — uses credits. Your current balance is always visible in the dashboard.",
  },
  {
    id: "credits-expire",
    category: "Credits",
    question: "Do purchased credits expire?",
    answer:
      "Monthly plan credits reset at renewal. Purchased credit packs never expire — they stay in your account until you use them.",
  },
  {
    id: "run-out",
    category: "Credits",
    question: "What happens if I run out of credits?",
    answer:
      "You can buy a one-time credit pack or upgrade your plan for more monthly credits. Your saved resumes and history stay available either way.",
  },
  {
    id: "cancel",
    category: "Billing",
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel anytime from billing settings; access continues until the end of the current billing period.",
  },
  {
    id: "payment",
    category: "Billing",
    question: "How is payment handled?",
    answer:
      "Payments are processed by Razorpay for INR and Stripe for USD. ResumeRocket never stores your card details.",
  },
  {
    id: "privacy-storage",
    category: "Privacy",
    question: "How is my resume stored?",
    answer:
      "Your resume is stored securely in your account and isn't used to train any model. You can delete your account and all associated data at any time from settings.",
  },
  {
    id: "github",
    category: "GitHub",
    question: "Can I analyze GitHub repositories?",
    answer:
      "Yes. Connect your GitHub account and ResumeRocket turns selected repositories into recruiter-ready, resume-ready project bullet points with a relevance indicator.",
  },
];
