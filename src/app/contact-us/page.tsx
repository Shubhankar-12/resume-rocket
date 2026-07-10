import type { Metadata } from "next";
import { getIsLoggedIn } from "@/lib/auth/getIsLoggedIn";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { ContactContent } from "@/components/marketing/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — ResumeRocket",
  description: "Get help from the ResumeRocket team.",
  alternates: { canonical: "/contact-us" },
};

export default async function ContactPage() {
  const isLoggedIn = await getIsLoggedIn();
  return (
    <MarketingShell isLoggedIn={isLoggedIn}>
      <ContactContent />
    </MarketingShell>
  );
}
