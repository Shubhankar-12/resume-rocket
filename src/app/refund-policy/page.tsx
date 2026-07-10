import type { Metadata } from "next";
import { getIsLoggedIn } from "@/lib/auth/getIsLoggedIn";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { RefundContent } from "@/components/marketing/legal/RefundContent";

export const metadata: Metadata = {
  title: "Refund Policy — ResumeRocket",
  description: "ResumeRocket's refund and cancellation policy.",
  alternates: { canonical: "/refund-policy" },
};

export default async function RefundPolicyPage() {
  const isLoggedIn = await getIsLoggedIn();
  return (
    <MarketingShell isLoggedIn={isLoggedIn}>
      <RefundContent />
    </MarketingShell>
  );
}
