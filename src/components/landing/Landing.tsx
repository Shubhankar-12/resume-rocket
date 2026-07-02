"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header/Header";
import { Hero } from "./v2/Hero";
import { WhyResumesFail } from "./v2/why/WhyResumesFail";
import { HowItWorks } from "./v2/sections/HowItWorks";
import { InteractiveDemo } from "./v2/sections/InteractiveDemo";
import { WorkspaceSection } from "./v2/workspace/WorkspaceSection";
import { ResumeTransformation } from "./v2/transformation/ResumeTransformation";
import { Pricing } from "./v2/sections/Pricing";
import { FAQ } from "./v2/sections/FAQ";
import { FinalCTA } from "./v2/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer/Footer";
import { captureEvent } from "@/lib/analytics/posthog";

export interface LandingProps {
  isLoggedIn: boolean;
}

export function Landing({ isLoggedIn }: LandingProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    captureEvent("landing_viewed", {
      referrer: document.referrer || undefined,
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
    });
  }, []);

  return (
    // overflow-x-clip (not hidden) contains any section's incidental horizontal
    // overflow without turning main into a scroll container, which would break
    // the sticky header.
    <main className="min-h-screen overflow-x-clip">
      <Header isLoggedIn={isLoggedIn} />
      <Hero />
      <WhyResumesFail />
      <HowItWorks />
      <InteractiveDemo />
      <WorkspaceSection />
      <ResumeTransformation />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default Landing;
