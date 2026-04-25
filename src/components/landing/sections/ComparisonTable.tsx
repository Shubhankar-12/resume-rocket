"use client";

import { Check, X } from "lucide-react";
import { SectionShell } from "../primitives/SectionShell";
import { EyebrowLabel } from "../primitives/EyebrowLabel";
import { COMPARISON, COMPETITORS, type ComparisonRow } from "../data/comparison";
import { captureEvent } from "@/lib/analytics/posthog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Included" />;
  if (value === false)
    return <X className="mx-auto h-5 w-5 text-muted-foreground" aria-label="Not included" />;
  return <span className="text-sm">{value}</span>;
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

export function ComparisonTable() {
  const onHover = (competitorName: string) =>
    captureEvent("comparison_row_hovered", { competitor_name: competitorName });

  return (
    <SectionShell id="compare" labelledBy="compare-h" variant="light">
      <div className="text-center">
        <EyebrowLabel>How we compare</EyebrowLabel>
        <h2 id="compare-h" className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          ResumeRocket vs. the alternatives.
        </h2>
      </div>

      {/* Desktop table */}
      <div className="mt-12 hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 text-left font-medium text-muted-foreground">Feature</th>
              {COMPETITORS.map((c) => (
                <th
                  key={c.id}
                  className={`py-4 text-center font-semibold ${
                    "highlight" in c && c.highlight ? "text-[hsl(var(--brand-600))]" : ""
                  }`}
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
                className="border-b border-border/50 transition-colors hover:bg-[hsl(var(--brand-50))]"
                onMouseEnter={() => onHover(row.feature)}
              >
                <td className="py-4 pr-4">{row.feature}</td>
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
                className={
                  "highlight" in c && c.highlight ? "text-[hsl(var(--brand-600))]" : undefined
                }
              >
                {c.label}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  {COMPARISON.map((row) => (
                    <li key={row.id} className="flex items-center justify-between gap-3">
                      <span>{row.feature}</span>
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
    </SectionShell>
  );
}
