"use client";

import { Sparkles } from "lucide-react";
import type { SectionEditorProps } from "../../../types";
import { ChipList } from "../fields";
import { useAiAssist } from "../../../hooks/useAiAssist";

export function SkillsSection({ draft, update }: SectionEditorProps) {
  const { suggestSkills, busy } = useAiAssist();

  const suggest = async () => {
    const role = draft.basics.headline || "";
    const experience = draft.experience
      .map((e) => `${e.role} at ${e.companyName}: ${e.bullets.join("; ")}`)
      .join("\n");
    const suggestions = await suggestSkills(role, experience, draft.skills);
    if (suggestions && suggestions.length) {
      const merged = [...draft.skills];
      for (const s of suggestions) if (!merged.includes(s)) merged.push(s);
      update({ skills: merged });
    }
  };

  return (
    <div className="space-y-2">
      <ChipList values={draft.skills} onChange={(v) => update({ skills: v })} />
      <button
        type="button"
        onClick={suggest}
        disabled={busy === "skills"}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rr-accent hover:text-rr-accent-hover disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {busy === "skills" ? "Thinking…" : "Suggest for my role"}
        <span className="text-rr-text-muted">· 1 credit</span>
      </button>
    </div>
  );
}
