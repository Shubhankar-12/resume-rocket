"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { PipelineDiagram } from "../problem/PipelineDiagram";
import { ProblemCard } from "../problem/ProblemCard";
import { PROBLEM_CARDS } from "../part2-demo-data";

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="problem-h"
          eyebrow="The Problem"
          title="Why Great Candidates Still Get Rejected"
          intro="Applicant tracking systems, missing keywords, inconsistent formatting, and resumes that aren't tailored for specific roles can prevent qualified candidates from moving forward."
        />

        <div className="mt-14 grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <PipelineDiagram />
          <div className="max-w-[60ch]">
            <p className="text-base leading-relaxed text-rr-text-secondary">
              Many resumes never reach a recruiter. Each stage of the hiring pipeline filters
              candidates out — often for reasons that have nothing to do with their ability.
            </p>
            <p className="mt-4 text-base leading-relaxed text-rr-text-secondary">
              ResumeRocket helps identify these issues before you apply, so a strong candidate
              isn&apos;t filtered out by a formatting problem or a missing keyword.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_CARDS.map((c) => (
            <ProblemCard key={c.title} title={c.title} body={c.body} />
          ))}
        </div>
      </div>
    </section>
  );
}
