"use client";

import { Copy, Download } from "lucide-react";
import { Typewriter } from "../../shared/Typewriter";
import { DEMO_COVER } from "../../part2-demo-data";

export function CoverLetterTab() {
  return (
    <div className="rounded-xl border border-rr-border bg-rr-card p-5">
      <Typewriter text={DEMO_COVER.text} className="text-sm" />
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-rr-text-muted">{DEMO_COVER.words} words</p>
        <div className="flex gap-2">
          {/* Demo controls — non-functional in the preview */}
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-rr-border px-3 py-1.5 text-xs font-medium text-rr-text-muted"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden /> Copy
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1.5 rounded-lg border border-rr-border px-3 py-1.5 text-xs font-medium text-rr-text-muted"
          >
            <Download className="h-3.5 w-3.5" aria-hidden /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
