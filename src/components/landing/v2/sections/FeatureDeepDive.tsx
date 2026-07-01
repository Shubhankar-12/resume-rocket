"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { DeepDiveFeature } from "../deepdive/DeepDiveFeature";
import { DEEP_DIVE } from "../part2-demo-data";

export function FeatureDeepDive() {
  return (
    <section
      id="deep-dive"
      aria-labelledby="deep-dive-h"
      className="bg-rr-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="deep-dive-h"
          eyebrow="Under the Hood"
          title="Deep Dive Into Features"
          intro="Understand exactly what each part of ResumeRocket does before you upload a single file."
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {DEEP_DIVE.map((f, i) => (
            <DeepDiveFeature
              key={f.key}
              feature={f.key}
              title={f.title}
              explanation={f.explanation}
              href={f.href}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
