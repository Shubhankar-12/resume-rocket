"use client";

import { Plus, Trash2 } from "lucide-react";
import type { BuilderLink, SectionEditorProps } from "../../../types";
import { TextField } from "../fields";

export function BasicsSection({ draft, update }: SectionEditorProps) {
  const { basics } = draft;

  const setLinks = (links: BuilderLink[]) => update({ basics: { ...basics, links } });

  const updateLink = (index: number, patch: Partial<BuilderLink>) =>
    setLinks(basics.links.map((link, i) => (i === index ? { ...link, ...patch } : link)));

  const removeLink = (index: number) => setLinks(basics.links.filter((_, i) => i !== index));

  const addLink = () => setLinks([...basics.links, { label: "", url: "" }]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField
            label="Full name"
            value={basics.name}
            onChange={(v) => update({ basics: { ...basics, name: v } })}
          />
        </div>
        <TextField
          label="Headline / target role"
          value={basics.headline}
          onChange={(v) => update({ basics: { ...basics, headline: v } })}
        />
        <TextField
          label="Email"
          value={basics.email}
          onChange={(v) => update({ basics: { ...basics, email: v } })}
        />
        <TextField
          label="Phone"
          value={basics.phone}
          onChange={(v) => update({ basics: { ...basics, phone: v } })}
        />
        <TextField
          label="Location"
          value={basics.location}
          onChange={(v) => update({ basics: { ...basics, location: v } })}
        />
      </div>

      <div className="space-y-2">
        <span className="block text-[11px] font-medium text-rr-text-muted">Links</span>
        {basics.links.map((link, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
              <TextField
                label="Label"
                value={link.label}
                onChange={(v) => updateLink(i, { label: v })}
              />
              <TextField label="URL" value={link.url} onChange={(v) => updateLink(i, { url: v })} />
            </div>
            <button
              type="button"
              aria-label="Remove link"
              onClick={() => removeLink(i)}
              className="mb-1 rounded-md border border-rr-border-muted p-2 text-rr-text-muted hover:text-rr-text"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="inline-flex items-center gap-1 rounded-md border border-rr-border-muted px-2.5 py-1.5 text-xs font-medium text-rr-text-muted hover:text-rr-text"
        >
          <Plus className="h-3.5 w-3.5" />
          Add link
        </button>
      </div>
    </div>
  );
}
