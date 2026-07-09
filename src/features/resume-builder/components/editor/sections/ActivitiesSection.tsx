"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderActivity, SectionEditorProps } from "../../../types";
import { TextArea, TextField } from "../fields";

export function ActivitiesSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderActivity>) =>
    update({
      activities: draft.activities.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ activities: draft.activities.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      activities: [
        ...draft.activities,
        {
          id: crypto.randomUUID(),
          title: "",
          organization: "",
          date: "",
          description: "",
        },
      ],
    });

  return (
    <div className="space-y-3">
      {draft.activities.map((item) => (
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
            label="Organization"
            value={item.organization}
            onChange={(v) => setItem(item.id, { organization: v })}
          />
          <TextField
            label="Date"
            value={item.date}
            onChange={(v) => setItem(item.id, { date: v })}
          />
          <TextArea
            label="Description"
            value={item.description}
            onChange={(v) => setItem(item.id, { description: v })}
          />

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove activity"
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
        <Plus className="h-4 w-4" /> Add activity
      </button>
    </div>
  );
}
