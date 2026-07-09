"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderCertification, SectionEditorProps } from "../../../types";
import { TextField } from "../fields";

export function CertificationsSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderCertification>) =>
    update({
      certifications: draft.certifications.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ certifications: draft.certifications.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      certifications: [
        ...draft.certifications,
        {
          id: crypto.randomUUID(),
          name: "",
          issuer: "",
          date: "",
          url: "",
        },
      ],
    });

  return (
    <div className="space-y-3">
      {draft.certifications.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-rr-border-muted bg-rr-card p-3 space-y-2"
        >
          <TextField
            label="Name"
            value={item.name}
            onChange={(v) => setItem(item.id, { name: v })}
          />
          <TextField
            label="Issuer"
            value={item.issuer}
            onChange={(v) => setItem(item.id, { issuer: v })}
          />
          <TextField
            label="Date"
            value={item.date}
            onChange={(v) => setItem(item.id, { date: v })}
          />
          <TextField label="URL" value={item.url} onChange={(v) => setItem(item.id, { url: v })} />

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove certification"
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
        <Plus className="h-4 w-4" /> Add certification
      </button>
    </div>
  );
}
