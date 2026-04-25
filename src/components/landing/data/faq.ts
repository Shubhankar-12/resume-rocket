export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ: FaqItem[] = [
  {
    id: "buzzwords",
    question: "Will it just rewrite my resume with buzzwords?",
    answer:
      "No. The grader points to specific lines and explains what's weak (e.g. vague ownership, no measurable impact). You decide what to change. The tailored-resume mode does rewrite, but it preserves your real experience — it doesn't fabricate.",
  },
  {
    id: "non-tech",
    question: "Does it work for non-tech roles?",
    answer:
      "Yes. The grading is role-agnostic. The tailoring step uses the job description you paste, so it works for product, design, marketing, finance, ops, and so on.",
  },
  {
    id: "free-credits",
    question: "What happens after my free credits run out?",
    answer:
      "You can buy a credit pack (no subscription) or upgrade to Pro for monthly credits. Credits never expire mid-month.",
  },
  {
    id: "vs-chatgpt",
    question: "How is this different from ChatGPT?",
    answer:
      "ChatGPT will rewrite anything you ask it to — including bad rewrites. We grade against what real recruiters and ATS systems flag, score it, and only suggest changes that move the score up. It's purpose-built, not a general-purpose chat.",
  },
  {
    id: "privacy",
    question: "Is my data private?",
    answer:
      "Yes. Your resume isn't used to train any model. You can delete your account and all associated data at any time from settings.",
  },
  {
    id: "signup",
    question: "Do I need to sign up to try it?",
    answer: "Yes — sign-up is free and gets you 10 credits to grade and tailor. No card required.",
  },
  {
    id: "refund",
    question: "Can I get a refund?",
    answer:
      "If a credit pack didn't work as expected, email support and we'll refund. Subscription refunds are pro-rated for unused months.",
  },
  {
    id: "formats",
    question: "Which file formats do you support?",
    answer: "PDF and DOCX for upload. Exports go out as PDF.",
  },
];
