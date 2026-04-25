"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";
import { FAQ as FAQ_ITEMS } from "../data/faq";
import { captureEvent } from "@/lib/analytics/posthog";

export function FAQ() {
  const onChange = (id: string) => {
    if (!id) return;
    captureEvent("faq_opened", { question_id: id });
  };
  return (
    <SectionShell id="faq" labelledBy="faq-h" variant="light">
      <div className="text-center">
        <EyebrowLabel>FAQ</EyebrowLabel>
        <h2 id="faq-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Questions you might be holding.
        </h2>
      </div>
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible onValueChange={onChange}>
          {FAQ_ITEMS.map((q) => (
            <AccordionItem key={q.id} value={q.id}>
              <AccordionTrigger className="text-left text-base">{q.question}</AccordionTrigger>
              <AccordionContent className="text-[hsl(var(--ink-700))]">{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
