"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BuilderResume, BuilderPatch, TemplateId } from "../../types";
import { TEMPLATES } from "../templates/registry";
import { ACCENT_HEX } from "../templates/shared";

/** Template picker + accent swatches. Persists via the same debounced `update`. */
export function TemplateGallery({
  resume,
  update,
}: {
  resume: BuilderResume;
  update: (patch: BuilderPatch) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          Template
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => {
            const active = resume.template_id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => update({ template_id: t.id as TemplateId })}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
                  active
                    ? "border-rr-accent bg-rr-accent-light"
                    : "border-rr-border-muted bg-rr-card hover:border-rr-accent/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-rr-text">{t.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-rr-accent" />}
                </div>
                <span className="text-[11px] text-rr-text-muted">{t.description}</span>
              </button>
            );
          })}
        </div>
      </div>

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
