"use client";

import { FileText } from "lucide-react";
import { ScoreRing } from "../shared/ScoreRing";
import { Typewriter } from "../shared/Typewriter";
import { MiniKanban } from "../shared/MiniKanban";

function Preview({ kind }: { kind: string }) {
  switch (kind) {
    case "upload":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-rr-border bg-rr-bg-elevated p-2 text-xs">
          <FileText className="h-3.5 w-3.5 text-rr-accent" aria-hidden />
          <span className="truncate text-rr-text-secondary">Senior_Frontend_Resume.pdf</span>
        </div>
      );
    case "score":
      return <ScoreRing value={87} size={56} centerText="A-" label="ATS score A-" />;
    case "beforeafter":
      return (
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-rr-bg-elevated px-2 py-1 text-rr-text-muted">Before</span>
          <span className="text-rr-text-muted">→</span>
          <span className="rounded-md bg-rr-accent-light px-2 py-1 font-medium text-rr-accent">
            After
          </span>
        </div>
      );
    case "typing":
      return <Typewriter text="Dear Hiring Manager, I'm excited to apply…" className="text-xs" />;
    case "repos":
      return (
        <div className="flex flex-wrap gap-1">
          {["resume-rocket", "portfolio", "algo-notes"].map((r) => (
            <span
              key={r}
              className="rounded-md border border-rr-border px-2 py-0.5 text-[10px] text-rr-text-secondary"
            >
              {r}
            </span>
          ))}
        </div>
      );
    case "kanban":
      return (
        <MiniKanban
          columns={[
            { column: "Applied", cards: [] },
            { column: "Interview", cards: [] },
            { column: "Offer", cards: [] },
            { column: "Rejected", cards: [] },
          ]}
        />
      );
    case "progress":
      return (
        <div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-rr-border-muted">
            <div className="h-full w-[65%] rounded-full bg-rr-accent" />
          </div>
          <p className="mt-1 text-[10px] text-rr-text-muted">65 of 100 credits left</p>
        </div>
      );
    case "billing":
      return (
        <div className="rounded-lg border border-rr-border bg-rr-bg-elevated p-2 text-xs">
          <p className="font-medium text-rr-text">Pro · Monthly</p>
          <p className="text-rr-text-muted">Renews automatically</p>
        </div>
      );
    default:
      return null;
  }
}

export function EcosystemCard({
  title,
  body,
  preview,
}: {
  title: string;
  body: string;
  preview: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-rr-border bg-rr-card p-5 transition-shadow hover:shadow-[0_16px_32px_-12px_hsl(240_24%_10%/0.16)]">
      <h3 className="text-sm font-semibold text-rr-text">{title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-rr-text-secondary">{body}</p>
      <div className="mt-4">
        <Preview kind={preview} />
      </div>
    </div>
  );
}
