"use client";

import { useEffect } from "react";
import { Navigation } from "./v2/Navigation";
import { Hero } from "./v2/Hero";
import { WhyResumesFail } from "./v2/why/WhyResumesFail";
import { HowItWorks } from "./v2/sections/HowItWorks";
import { InteractiveDemo } from "./v2/sections/InteractiveDemo";
import { WorkspaceSection } from "./v2/workspace/WorkspaceSection";
import { Pricing } from "./v2/sections/Pricing";
import { FAQ } from "./v2/sections/FAQ";
import { FinalCTA } from "./v2/sections/FinalCTA";
import { Footer } from "./v2/sections/Footer";
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
    <main className="min-h-screen">
      <Navigation isLoggedIn={isLoggedIn} />
      <Hero />
      <WhyResumesFail />
      <HowItWorks />
      <InteractiveDemo />
      <WorkspaceSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default Landing;
