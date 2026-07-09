"use client";

import { useEffect, useState } from "react";
import { X, FileText, Sparkles } from "lucide-react";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { cn } from "@/lib/utils";
import { getUserIdFromToken } from "../lib/user";
import { TEMPLATES } from "./templates/registry";
import type { TemplateId } from "../types";
import type { CreateDraftArgs } from "../hooks/useResumeDrafts";

interface SourceResume {
  resume_id: string;
  label: string;
}

export function NewResumeDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (args: CreateDraftArgs) => Promise<void>;
}) {
  const [title, setTitle] = useState("Untitled resume");
  const [templateId, setTemplateId] = useState<TemplateId>("classic");
  const [mode, setMode] = useState<"blank" | "import">("blank");
  const [sources, setSources] = useState<SourceResume[]>([]);
  const [sourceId, setSourceId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;
      try {
        const res = await ResumeAPI.getAllResumes({ user_id: userId });
        const body = res?.data?.body;
        const items = Array.isArray(body) ? body : [];
        setSources(
          items.map((r: Record<string, any>) => ({
            resume_id: r.resume_id,
            label: r?.resume?.name || r?.extracted_resume?.name || r?.resume_id || "Resume",
          }))
        );
      } catch {
        setSources([]);
      }
    })();
  }, []);

  const create = async () => {
    setSubmitting(true);
    try {
      await onCreate({
        title: title.trim() || "Untitled resume",
        template_id: templateId,
        seed_from_resume_id: mode === "import" ? sourceId || null : null,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const canCreate = mode === "blank" || (mode === "import" && !!sourceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl border border-rr-border-muted bg-rr-bg-elevated p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-rr-text">New resume</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1 text-rr-text-muted hover:bg-rr-bg hover:text-rr-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-4 block">
          <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">Title</span>
          <input
            className="w-full rounded-md border border-rr-border-muted bg-rr-bg px-2.5 py-1.5 text-sm text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <div className="mb-4">
          <p className="mb-1.5 text-[11px] font-medium text-rr-text-muted">Template</p>
          <div className="grid grid-cols-3 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={cn(
                  "rounded-lg border p-2 text-left text-[13px] font-medium transition-colors",
                  templateId === t.id
                    ? "border-rr-accent bg-rr-accent-light text-rr-accent"
                    : "border-rr-border-muted bg-rr-card text-rr-text-secondary hover:border-rr-accent/40"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("blank")}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 text-left transition-colors",
              mode === "blank"
                ? "border-rr-accent bg-rr-accent-light"
                : "border-rr-border-muted bg-rr-card hover:border-rr-accent/40"
            )}
          >
            <FileText className="h-4 w-4 text-rr-accent" />
            <span className="text-[13px] font-medium text-rr-text">Start blank</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("import")}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 text-left transition-colors",
              mode === "import"
                ? "border-rr-accent bg-rr-accent-light"
                : "border-rr-border-muted bg-rr-card hover:border-rr-accent/40"
            )}
          >
            <Sparkles className="h-4 w-4 text-rr-accent" />
            <span className="text-[13px] font-medium text-rr-text">Import a resume</span>
          </button>
        </div>

        {mode === "import" && (
          <label className="mb-4 block">
            <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">
              Source resume
            </span>
            {sources.length === 0 ? (
              <p className="text-[13px] text-rr-text-muted">
                No uploaded resumes found. Upload one first, or start blank.
              </p>
            ) : (
              <select
                className="w-full rounded-md border border-rr-border-muted bg-rr-bg px-2.5 py-1.5 text-sm text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
              >
                <option value="">Select a resume…</option>
                {sources.map((s) => (
                  <option key={s.resume_id} value={s.resume_id}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
          </label>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-[13px] font-medium text-rr-text-secondary hover:bg-rr-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canCreate || submitting}
            onClick={create}
            className="rounded-lg bg-rr-accent px-4 py-2 text-[13px] font-semibold text-white hover:bg-rr-accent-hover disabled:opacity-50"
          >
            {submitting ? "Creating…" : "Create resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
