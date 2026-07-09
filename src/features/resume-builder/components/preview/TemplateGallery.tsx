"use client";

import { Check, ShieldCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BuilderResume, BuilderPatch, TemplateId } from "../../types";
import { TEMPLATES, type TemplateCategory } from "../templates/registry";
import { ACCENT_HEX } from "../templates/shared";

const GROUPS: { category: TemplateCategory; title: string; note?: string }[] = [
  { category: "ats", title: "ATS-friendly" },
  {
    category: "designer",
    title: "Designer",
    note: "Great for portfolios and human reviewers; may not parse in some job portals.",
  },
];

/** Template picker (categorized, with ATS badges) + accent swatches. */
export function TemplateGallery({
  resume,
  update,
}: {
  resume: BuilderResume;
  update: (patch: BuilderPatch) => void;
}) {
  return (
    <div className="space-y-5">
      {GROUPS.map((group) => {
        const items = TEMPLATES.filter((t) => t.category === group.category);
        if (!items.length) return null;
        return (
          <div key={group.category}>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
              {group.title}
            </p>
            {group.note && <p className="mb-2 text-[11px] text-rr-text-muted">{group.note}</p>}
            <div className="grid grid-cols-2 gap-2">
              {items.map((t) => {
                const active = resume.template_id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => update({ template_id: t.id as TemplateId })}
                    className={cn(
                      "rounded-lg border p-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
                      active
                        ? "border-rr-accent bg-rr-accent-light"
                        : "border-rr-border-muted bg-rr-card hover:border-rr-accent/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-[13px] font-semibold text-rr-text">
                        {t.label}
                      </span>
                      {active && <Check className="h-3.5 w-3.5 shrink-0 text-rr-accent" />}
                    </div>
                    <span className="block truncate text-[11px] text-rr-text-muted">
                      {t.description}
                    </span>
                    <span
                      className={cn(
                        "mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium",
                        t.atsSafe
                          ? "bg-rr-success/12 text-rr-success"
                          : "bg-rr-warning/15 text-rr-warning"
                      )}
                    >
                      {t.atsSafe ? (
                        <ShieldCheck className="h-3 w-3" />
                      ) : (
                        <TriangleAlert className="h-3 w-3" />
                      )}
                      {t.atsSafe ? "ATS" : "Not ATS"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          Accent
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ACCENT_HEX).map(([key, hex]) => {
            const active = (resume.accent_color || "accent") === key;
            return (
              <button
                key={key}
                type="button"
                aria-label={`Accent ${key}`}
                onClick={() => update({ accent_color: key })}
                className={cn(
                  "h-7 w-7 rounded-full ring-offset-2 ring-offset-rr-bg transition focus-visible:outline-none",
                  active && "ring-2 ring-rr-accent"
                )}
                style={{ backgroundColor: hex }}
              >
                {active && <Check className="mx-auto h-3.5 w-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
