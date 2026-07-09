"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderPublication, SectionEditorProps } from "../../../types";
import { TextArea, TextField } from "../fields";

export function PublicationsSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderPublication>) =>
    update({
      publications: draft.publications.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ publications: draft.publications.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      publications: [
        ...draft.publications,
        {
          id: crypto.randomUUID(),
          title: "",
          publisher: "",
          date: "",
          url: "",
          description: "",
        },
      ],
    });

  return (
    <div className="space-y-3">
      {draft.publications.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-rr-border-muted bg-rr-card p-3 space-y-2"
        >
          <TextField
            label="Title"
            value={item.title}
            onChange={(v) => setItem(item.id, { title: v })}
          />
          <TextField
            label="Publisher"
            value={item.publisher}
            onChange={(v) => setItem(item.id, { publisher: v })}
          />
          <TextField
            label="Date"
            value={item.date}
            onChange={(v) => setItem(item.id, { date: v })}
          />
          <TextField label="URL" value={item.url} onChange={(v) => setItem(item.id, { url: v })} />
          <TextArea
            label="Description"
            value={item.description}
            onChange={(v) => setItem(item.id, { description: v })}
          />

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove publication"
              onClick={() => removeItem(item.id)}
              className="inline-flex items-center gap-1 text-xs font-medium text-rr-text-muted hover:text-rr-danger"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 rounded-md border border-rr-border-muted px-3 py-1.5 text-sm font-medium text-rr-text hover:bg-rr-bg"
      >
        <Plus className="h-4 w-4" /> Add publication
      </button>
    </div>
  );
}
