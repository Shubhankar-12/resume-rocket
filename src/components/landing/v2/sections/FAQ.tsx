"use client";

import { SectionHeading } from "../shared/SectionHeading";
import { FaqAccordion } from "../faq/FaqAccordion";
import { FAQ_ITEMS } from "../part3-faq-data";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-rr-bg-elevated py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="faq-h"
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          intro="Everything you need to know about analysis, credits, billing, and privacy."
        />
        <div className="mt-12">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
