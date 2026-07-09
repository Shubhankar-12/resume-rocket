"use client";

import type { SectionEditorProps } from "../../../types";
import { ChipList } from "../fields";

export function SkillsSection({ draft, update }: SectionEditorProps) {
  return <ChipList values={draft.skills} onChange={(v) => update({ skills: v })} />;
}
