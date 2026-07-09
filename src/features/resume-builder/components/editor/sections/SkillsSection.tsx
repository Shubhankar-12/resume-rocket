"use client";

import { useState } from "react";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import type { SectionEditorProps, SkillGroup, SkillItem, SkillLevel } from "../../../types";
import { ChipList, SelectField, TextField } from "../fields";
import { useAiAssist } from "../../../hooks/useAiAssist";

type Mode = "simple" | "grouped";

const LEVEL_OPTIONS = [
  { value: "", label: "No level" },
  { value: "expert", label: "Expert" },
  { value: "proficient", label: "Proficient" },
  { value: "intermediate", label: "Intermediate" },
  { value: "beginner", label: "Beginner" },
];

export function SkillsSection({ draft, update }: SectionEditorProps) {
  const [mode, setMode] = useState<Mode>(draft.skillGroups?.length ? "grouped" : "simple");
  const { suggestSkills, busy } = useAiAssist();

  const groups = draft.skillGroups ?? [];

  const setGroups = (next: SkillGroup[]) => update({ skillGroups: next });

  const suggest = async () => {
    const role = draft.basics.headline || "";
    const experience = draft.experience.map((e) => `${e.role} at ${e.companyName}`).join("\n");
    const existing =
      mode === "grouped"
        ? groups.flatMap((g) => g.skills.map((s) => s.name).filter(Boolean))
        : draft.skills;
    const suggestions = await suggestSkills(role, experience, existing);
    if (!suggestions || !suggestions.length) return;

    if (mode === "grouped") {
      const base = groups.length
        ? groups
        : [{ id: crypto.randomUUID(), category: "Skills", skills: [] }];
      const present = new Set(base[0].skills.map((s) => s.name));
      const added = suggestions.filter((s) => !present.has(s)).map((s) => ({ name: s }));
      update({
        skillGroups: base.map((g, i) => (i === 0 ? { ...g, skills: [...g.skills, ...added] } : g)),
      });
    } else {
      const merged = [...draft.skills];
      for (const s of suggestions) if (!merged.includes(s)) merged.push(s);
      update({ skills: merged });
    }
  };

  const addGroup = () =>
    setGroups([...groups, { id: crypto.randomUUID(), category: "", skills: [] }]);

  const removeGroup = (gid: string) => setGroups(groups.filter((g) => g.id !== gid));

  const patchGroup = (gid: string, patch: Partial<SkillGroup>) =>
    setGroups(groups.map((g) => (g.id === gid ? { ...g, ...patch } : g)));

  const addSkill = (gid: string) => {
    const group = groups.find((g) => g.id === gid);
    if (!group) return;
    patchGroup(gid, { skills: [...group.skills, { name: "" }] });
  };

  const removeSkill = (gid: string, index: number) => {
    const group = groups.find((g) => g.id === gid);
    if (!group) return;
    patchGroup(gid, { skills: group.skills.filter((_, i) => i !== index) });
  };

  const patchSkill = (gid: string, index: number, patch: Partial<SkillItem>) => {
    const group = groups.find((g) => g.id === gid);
    if (!group) return;
    patchGroup(gid, {
      skills: group.skills.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    });
  };

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-md border border-rr-border-muted p-0.5">
        {(["simple", "grouped"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              mode === m
                ? "rounded px-3 py-1 text-xs font-medium bg-rr-accent text-white"
                : "rounded px-3 py-1 text-xs font-medium text-rr-text-muted hover:text-rr-text"
            }
          >
            {m === "simple" ? "Simple" : "Grouped"}
          </button>
        ))}
      </div>

      {mode === "simple" ? (
        <ChipList values={draft.skills} onChange={(v) => update({ skills: v })} />
      ) : (
        <div className="space-y-3">
          {groups.map((group) => (
            <div
              key={group.id}
              className="space-y-2 rounded-md border border-rr-border-muted bg-rr-bg-elevated p-3"
            >
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <TextField
                    label="Category"
                    value={group.category}
                    onChange={(v) => patchGroup(group.id, { category: v })}
                    placeholder="e.g. Languages, Frameworks"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove group"
                  onClick={() => removeGroup(group.id)}
                  className="mb-0.5 rounded-md border border-rr-border-muted p-1.5 text-rr-text-muted hover:text-rr-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                {group.skills.map((skill, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="flex-1">
                      <TextField
                        value={skill.name}
                        onChange={(v) => patchSkill(group.id, index, { name: v })}
                        placeholder="Skill"
                      />
                    </div>
                    <div className="w-40">
                      <SelectField
                        value={skill.level ?? ""}
                        onChange={(v) =>
                          patchSkill(group.id, index, {
                            level: v ? (v as SkillLevel) : undefined,
                          })
                        }
                        options={LEVEL_OPTIONS}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove skill"
                      onClick={() => removeSkill(group.id, index)}
                      className="mb-0.5 rounded-md border border-rr-border-muted p-1.5 text-rr-text-muted hover:text-rr-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSkill(group.id)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rr-accent hover:text-rr-accent-hover"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add skill
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addGroup}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rr-accent hover:text-rr-accent-hover"
          >
            <Plus className="h-3.5 w-3.5" />
            Add group
          </button>
        </div>
      )}

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
