"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { captureEvent } from "@/lib/analytics/posthog";
import { SectionHeading } from "../shared/SectionHeading";
import { COMPARISON, COMPETITORS, type ComparisonRow } from "../../data/comparison";

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-rr-success" aria-label="Included" />;
  if (value === false)
    return <X className="mx-auto h-5 w-5 text-rr-text-muted" aria-label="Not included" />;
  return <span className="text-sm text-rr-text-secondary">{value}</span>;
}

function valueFor(row: ComparisonRow, competitorId: string) {
  switch (competitorId) {
    case "resumerocket":
      return row.resumerocket;
    case "chatgpt":
      return row.chatgpt;
    case "resumeWorded":
      return row.resumeWorded;
    case "hiringCoach":
      return row.hiringCoach;
    default:
      return false;
  }
}

export function Comparison() {
  const onHover = (competitorName: string) =>
    captureEvent("comparison_row_hovered", { competitor_name: competitorName });

  return (
    <section id="compare" aria-labelledby="compare-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeading
          id="compare-h"
          eyebrow="How we compare"
          title="ResumeRocket vs. the alternatives"
        />

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-rr-border">
                <th className="py-4 text-left font-medium text-rr-text-muted">Feature</th>
                {COMPETITORS.map((c) => (
                  <th
                    key={c.id}
                    className={cn(
                      "py-4 text-center font-semibold text-rr-text",
                      "highlight" in c && c.highlight && "text-rr-accent"
                    )}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-rr-border-muted transition-colors hover:bg-rr-accent-light"
                  onMouseEnter={() => onHover(row.feature)}
                >
                  <td className="py-4 pr-4 text-rr-text">{row.feature}</td>
                  {COMPETITORS.map((c) => (
                    <td key={c.id} className="py-4 text-center">
                      <Cell value={valueFor(row, c.id)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile accordion */}
        <div className="mt-12 md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {COMPETITORS.map((c) => (
              <AccordionItem key={c.id} value={c.id}>
                <AccordionTrigger
                  className={cn(
                    "text-rr-text",
                    "highlight" in c && c.highlight && "text-rr-accent"
                  )}
                >
                  {c.label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm">
                    {COMPARISON.map((row) => (
                      <li key={row.id} className="flex items-center justify-between gap-3">
                        <span className="text-rr-text-secondary">{row.feature}</span>
                        <span>
                          <Cell value={valueFor(row, c.id)} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
