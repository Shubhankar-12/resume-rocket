"use client";

import { Sparkles } from "lucide-react";
import type { SectionEditorProps } from "../../../types";
import { TextArea } from "../fields";
import { useAiAssist } from "../../../hooks/useAiAssist";

export function SummarySection({ draft, update }: SectionEditorProps) {
  const { generateSummary, busy } = useAiAssist();

  const write = async () => {
    const payload = JSON.stringify({
      headline: draft.basics.headline,
      skills: draft.skills,
      experience: draft.experience,
    });
    const summary = await generateSummary(payload);
    if (summary) update({ summary });
  };

  return (
    <div className="space-y-2">
      <TextArea
        label="Professional summary"
        rows={4}
        value={draft.summary}
        onChange={(v) => update({ summary: v })}
      />
      <button
        type="button"
        onClick={write}
        disabled={busy === "summary"}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rr-accent hover:text-rr-accent-hover disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {busy === "summary" ? "Writing…" : "Write with AI"}
        <span className="text-rr-text-muted">· 1 credit</span>
      </button>
    </div>
  );
}
