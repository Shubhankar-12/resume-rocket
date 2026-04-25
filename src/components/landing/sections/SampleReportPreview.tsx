"use client";

import Image from "next/image";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";

export function SampleReportPreview() {
  return (
    <SectionShell id="sample" labelledBy="sample-h" variant="lightGray">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <EyebrowLabel>Sample report</EyebrowLabel>
          <h2 id="sample-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Every resume gets a full report.
          </h2>
          <p className="mt-4 text-base text-[hsl(var(--ink-700))] md:text-lg">
            Score out of 100. ATS-readiness check. Line-by-line suggestions for what to rewrite.
            Plus a tailored version for any specific role.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[hsl(var(--ink-700))]">
            <li>• Score with breakdown by section</li>
            <li>• ATS-friendly: yes/no with reasons</li>
            <li>• Specific rewrite suggestions for weak bullets</li>
            <li>• Tailored variant for the role you paste</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-xl">
          <Image
            src="/grader.png"
            alt="A graded resume report with score and recommendations"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </SectionShell>
  );
}
