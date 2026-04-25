"use client";

import { useCallback } from "react";
import {
  FileText,
  Gauge,
  Wand2,
  Mail,
  Kanban,
  Github,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";
import { FEATURES, STAGE_ORDER, STAGE_TITLES, type Feature } from "../data/features";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { captureEvent } from "@/lib/analytics/posthog";

const ICONS: Record<Feature["iconName"], LucideIcon> = {
  FileText,
  Gauge,
  Wand2,
  Mail,
  Kanban,
  Github,
  Sparkles,
};

function StageGroup({ stage }: { stage: Feature["stage"] }) {
  const items = FEATURES.filter((f) => f.stage === stage);
  const fire = useCallback(() => {
    captureEvent("feature_section_viewed", { feature_id: stage });
  }, [stage]);
  const ref = useInViewOnce(fire, `feature-${stage}`);
  return (
    <div ref={ref} className="space-y-4">
      <EyebrowLabel>{STAGE_TITLES[stage]}</EyebrowLabel>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((f) => {
          const Icon = ICONS[f.iconName];
          return (
            <div
              key={f.id}
              className="rounded-lg border border-border p-5 transition-shadow hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-[hsl(var(--brand-600))]" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--ink-700))]">{f.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturesByStage() {
  return (
    <SectionShell id="features" labelledBy="features-h" variant="light">
      <div className="text-center">
        <EyebrowLabel>Features</EyebrowLabel>
        <h2 id="features-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Everything you need across the job-search journey.
        </h2>
      </div>
      <div className="mt-14 space-y-12">
        {STAGE_ORDER.map((stage) => (
          <StageGroup key={stage} stage={stage} />
        ))}
      </div>
    </SectionShell>
  );
}
