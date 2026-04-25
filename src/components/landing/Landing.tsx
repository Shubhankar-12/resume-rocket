"use client";

import { useEffect } from "react";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { SocialProofStrip } from "./sections/SocialProofStrip";
import { ProblemFraming } from "./sections/ProblemFraming";
import { DemoShowcase } from "./sections/DemoShowcase";
import { HowItWorks } from "./sections/HowItWorks";
import { FeaturesByStage } from "./sections/FeaturesByStage";
import { SampleReportPreview } from "./sections/SampleReportPreview";
import { ComparisonTable } from "./sections/ComparisonTable";
import { Testimonials } from "./sections/Testimonials";
import { PricingTeaser } from "./sections/PricingTeaser";
import { FAQ } from "./sections/FAQ";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";
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
      <Header isLoggedIn={isLoggedIn} />
      <Hero />
      <SocialProofStrip />
      <ProblemFraming />
      <DemoShowcase />
      <HowItWorks />
      <FeaturesByStage />
      <SampleReportPreview />
      <ComparisonTable />
      <Testimonials />
      <PricingTeaser />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default Landing;
