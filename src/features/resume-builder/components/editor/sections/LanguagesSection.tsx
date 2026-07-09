"use client";

import { Plus, Trash2 } from "lucide-react";
import type { SectionEditorProps, LanguageItem, LanguageLevel } from "../../../types";
import { SelectField, TextField } from "../fields";

const LEVEL_OPTIONS = [
  { value: "", label: "No level" },
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "professional", label: "Professional" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
];

export function LanguagesSection({ draft, update }: SectionEditorProps) {
  const items = draft.languageItems ?? [];

  const setItems = (next: LanguageItem[]) => update({ languageItems: next });

  const addLanguage = () =>
    setItems([...items, { id: crypto.randomUUID(), name: "", level: undefined }]);

  const removeLanguage = (id: string) => setItems(items.filter((l) => l.id !== id));

  const patchLanguage = (id: string, patch: Partial<LanguageItem>) =>
    setItems(items.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-end gap-2">
          <div className="flex-1">
            <TextField
              value={item.name}
              onChange={(v) => patchLanguage(item.id, { name: v })}
              placeholder="Language"
            />
          </div>
          <div className="w-40">
            <SelectField
              value={item.level ?? ""}
              onChange={(v) =>
                patchLanguage(item.id, { level: v ? (v as LanguageLevel) : undefined })
              }
              options={LEVEL_OPTIONS}
            />
          </div>
          <button
            type="button"
            aria-label="Remove language"
            onClick={() => removeLanguage(item.id)}
            className="mb-0.5 rounded-md border border-rr-border-muted p-1.5 text-rr-text-muted hover:text-rr-danger"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addLanguage}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-rr-accent hover:text-rr-accent-hover"
      >
        <Plus className="h-3.5 w-3.5" />
        Add language
      </button>
    </div>
  );
}
