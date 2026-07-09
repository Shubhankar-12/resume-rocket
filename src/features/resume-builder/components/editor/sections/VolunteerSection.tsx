"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderVolunteer, SectionEditorProps } from "../../../types";
import { TextField } from "../fields";
import { MonthField } from "../MonthField";
import { RichTextEditor } from "../RichTextEditor";

export function VolunteerSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderVolunteer>) =>
    update({
      volunteer: draft.volunteer.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ volunteer: draft.volunteer.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      volunteer: [
        ...draft.volunteer,
        {
          id: crypto.randomUUID(),
          role: "",
          organization: "",
          location: "",
          startDate: "",
          endDate: "",
          isPresent: false,
          description: "",
        },
      ],
    });

  return (
    <div className="space-y-3">
      {draft.volunteer.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-rr-border-muted bg-rr-card p-3 space-y-2"
        >
          <TextField
            label="Role"
            value={item.role}
            onChange={(v) => setItem(item.id, { role: v })}
          />
          <TextField
            label="Organization"
            value={item.organization}
            onChange={(v) => setItem(item.id, { organization: v })}
          />
          <TextField
            label="Location"
            value={item.location}
            onChange={(v) => setItem(item.id, { location: v })}
          />
          <div className="grid grid-cols-2 gap-2">
            <MonthField
              label="Start date"
              value={item.startDate}
              onChange={(v) => setItem(item.id, { startDate: v })}
            />
            {!item.isPresent && (
              <MonthField
                label="End date"
                value={item.endDate}
                onChange={(v) => setItem(item.id, { endDate: v })}
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-rr-text">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-rr-border-muted text-rr-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
              checked={item.isPresent}
              onChange={(e) =>
                setItem(item.id, {
                  isPresent: e.target.checked,
                  ...(e.target.checked ? { endDate: "" } : {}),
                })
              }
            />
            Currently volunteering here
          </label>

          <div>
            <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">
              Description
            </span>
            <RichTextEditor
              value={item.description}
              onChange={(v) => setItem(item.id, { description: v })}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove volunteer"
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
        <Plus className="h-4 w-4" /> Add volunteer
      </button>
    </div>
  );
}
