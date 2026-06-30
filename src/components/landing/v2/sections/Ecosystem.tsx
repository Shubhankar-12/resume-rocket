"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { EcosystemCard } from "../ecosystem/EcosystemCard";
import { ECOSYSTEM } from "../part2-demo-data";

export function Ecosystem() {
  return (
    <section id="features" aria-labelledby="features-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="features-h"
          eyebrow="The Platform"
          title="Designed Around the Complete Job Application Journey"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((card) => (
            <EcosystemCard
              key={card.title}
              title={card.title}
              body={card.body}
              preview={card.preview}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
