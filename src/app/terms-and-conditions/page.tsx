import type { Metadata } from "next";
import { getIsLoggedIn } from "@/lib/auth/getIsLoggedIn";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { TermsContent } from "@/components/marketing/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions — ResumeRocket",
  description: "The terms and conditions governing your use of ResumeRocket.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function TermsPage() {
  const isLoggedIn = await getIsLoggedIn();
  return (
    <MarketingShell isLoggedIn={isLoggedIn}>
      <TermsContent />
    </MarketingShell>
  );
}
