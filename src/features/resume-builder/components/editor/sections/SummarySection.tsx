"use client";

import type { SectionEditorProps } from "../../../types";
import { TextArea } from "../fields";

export function SummarySection({ draft, update }: SectionEditorProps) {
  return (
    <TextArea
      label="Professional summary"
      rows={4}
      value={draft.summary}
      onChange={(v) => update({ summary: v })}
    />
  );
}
