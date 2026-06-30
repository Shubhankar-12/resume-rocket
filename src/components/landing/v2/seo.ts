import { FAQ_ITEMS, type FaqItem } from "./part3-faq-data";

const DESCRIPTION =
  "ResumeRocket helps you create stronger job applications with AI: ATS analysis, recruiter-focused feedback, resume tailoring, AI cover letters, GitHub project analysis, and application tracking — all in one workspace.";

export function buildSoftwareAppLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ResumeRocket",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    // A free tier genuinely exists; no fabricated paid price (those are region-specific + dynamic).
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function buildFaqLd(items: FaqItem[] = FAQ_ITEMS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export const LANDING_DESCRIPTION = DESCRIPTION;
