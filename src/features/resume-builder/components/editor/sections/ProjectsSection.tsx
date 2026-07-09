"use client";

import { Plus, Trash2 } from "lucide-react";

import type { BuilderLink, BuilderProject, SectionEditorProps } from "../../../types";
import { ChipList, TextArea, TextField } from "../fields";

export function ProjectsSection({ draft, update }: SectionEditorProps) {
  const setItem = (id: string, patch: Partial<BuilderProject>) =>
    update({
      projects: draft.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    });

  const removeItem = (id: string) =>
    update({ projects: draft.projects.filter((x) => x.id !== id) });

  const addItem = () =>
    update({
      projects: [
        ...draft.projects,
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          technologies: [],
          links: [],
        },
      ],
    });

  const setLinks = (id: string, links: BuilderLink[]) => setItem(id, { links });

  return (
    <div className="space-y-3">
      {draft.projects.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-rr-border-muted bg-rr-card p-3 space-y-2"
        >
          <TextField
            label="Title"
            value={item.title}
            onChange={(v) => setItem(item.id, { title: v })}
          />
          <TextArea
            label="Description"
            value={item.description}
            onChange={(v) => setItem(item.id, { description: v })}
          />
          <ChipList
            label="Technologies"
            values={item.technologies}
            onChange={(v) => setItem(item.id, { technologies: v })}
          />

          <div className="space-y-1.5">
            <span className="block text-[11px] font-medium text-rr-text-muted">Links</span>
            {item.links.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <TextField
                    value={link.label}
                    placeholder="Label"
                    onChange={(v) =>
                      setLinks(
                        item.id,
                        item.links.map((l, idx) => (idx === i ? { ...l, label: v } : l))
                      )
                    }
                  />
                </div>
                <div className="flex-1">
                  <TextField
                    value={link.url}
                    placeholder="URL"
                    onChange={(v) =>
                      setLinks(
                        item.id,
                        item.links.map((l, idx) => (idx === i ? { ...l, url: v } : l))
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  aria-label="Remove link"
                  onClick={() =>
                    setLinks(
                      item.id,
                      item.links.filter((_, idx) => idx !== i)
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
              onClick={() => setLinks(item.id, [...item.links, { label: "", url: "" }])}
              className="inline-flex items-center gap-1 text-xs font-medium text-rr-accent hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add link
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Remove project"
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
        <Plus className="h-4 w-4" /> Add project
      </button>
    </div>
  );
}
