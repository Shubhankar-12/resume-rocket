"use client";

import type { SectionEditorProps } from "../../../types";
import { ChipList } from "../fields";

export function InterestsSection({ draft, update }: SectionEditorProps) {
  return <ChipList values={draft.interests} onChange={(v) => update({ interests: v })} />;
}
