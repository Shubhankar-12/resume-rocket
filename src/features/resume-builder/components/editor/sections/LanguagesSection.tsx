"use client";

import type { SectionEditorProps } from "../../../types";
import { ChipList } from "../fields";

export function LanguagesSection({ draft, update }: SectionEditorProps) {
  return <ChipList values={draft.languages} onChange={(v) => update({ languages: v })} />;
}
