"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderEducation, SectionEditorProps } from "../../../types";
import { TextField } from "../fields";

export function EducationSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderEducation>) =>
    update({
      education: draft.education.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ education: draft.education.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      education: [
        ...draft.education,
        {
          id: crypto.randomUUID(),
          degree: "",
          subject: "",
          schoolName: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
    });

  return (
    <div className="space-y-3">
      {draft.education.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-rr-border-muted bg-rr-card p-3 space-y-2"
        >
          <TextField
            label="Degree"
            value={item.degree}
            onChange={(v) => setItem(item.id, { degree: v })}
          />
          <TextField
            label="Subject"
            value={item.subject}
            onChange={(v) => setItem(item.id, { subject: v })}
          />
          <TextField
            label="School"
            value={item.schoolName}
            onChange={(v) => setItem(item.id, { schoolName: v })}
          />
          <TextField
            label="Location"
            value={item.location}
            onChange={(v) => setItem(item.id, { location: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Start date"
              value={item.startDate}
              onChange={(v) => setItem(item.id, { startDate: v })}
            />
            <TextField
              label="End date"
              value={item.endDate}
              onChange={(v) => setItem(item.id, { endDate: v })}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove education"
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
        <Plus className="h-4 w-4" /> Add education
      </button>
    </div>
  );
}
