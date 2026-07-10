import type { Metadata } from "next";
import { getIsLoggedIn } from "@/lib/auth/getIsLoggedIn";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { PrivacyContent } from "@/components/marketing/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — ResumeRocket",
  description: "How ResumeRocket collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const isLoggedIn = await getIsLoggedIn();
  return (
    <MarketingShell isLoggedIn={isLoggedIn}>
      <PrivacyContent />
    </MarketingShell>
  );
}
