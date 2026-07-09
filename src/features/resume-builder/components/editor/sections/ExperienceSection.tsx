"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderExperience, SectionEditorProps } from "../../../types";
import { TextField } from "../fields";

export function ExperienceSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderExperience>) =>
    update({
      experience: draft.experience.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ experience: draft.experience.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      experience: [
        ...draft.experience,
        {
          id: crypto.randomUUID(),
          role: "",
          companyName: "",
          location: "",
          startDate: "",
          endDate: "",
          isPresent: false,
          bullets: [],
        },
      ],
    });

  const setBullets = (id: string, bullets: string[]) => setItem(id, { bullets });

  return (
    <div className="space-y-3">
      {draft.experience.map((item) => (
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
            label="Company"
            value={item.companyName}
            onChange={(v) => setItem(item.id, { companyName: v })}
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
              value={item.isPresent ? "" : item.endDate}
              onChange={(v) => setItem(item.id, { endDate: v })}
            />
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
            Currently working here
          </label>

          <div className="space-y-1.5">
            <span className="block text-[11px] font-medium text-rr-text-muted">Bullets</span>
            {item.bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <TextField
                    value={bullet}
                    onChange={(v) =>
                      setBullets(
                        item.id,
                        item.bullets.map((b, idx) => (idx === i ? v : b))
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove bullet"
                  onClick={() =>
                    setBullets(
                      item.id,
                      item.bullets.filter((_, idx) => idx !== i)
                    )
                  }
                  className="text-rr-text-muted hover:text-rr-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setBullets(item.id, [...item.bullets, ""])}
              className="inline-flex items-center gap-1 text-xs font-medium text-rr-accent hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add bullet
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove experience"
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
        <Plus className="h-4 w-4" /> Add experience
      </button>
    </div>
  );
}
