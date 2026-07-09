"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { FilePlus2, FileText, Trash2 } from "lucide-react";
import { useResumeDrafts, type CreateDraftArgs } from "../hooks/useResumeDrafts";
import { NewResumeDialog } from "./NewResumeDialog";

export function ResumeBuilderListPage() {
  const router = useRouter();
  const { drafts, loading, error, create, remove } = useResumeDrafts();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = async (args: CreateDraftArgs) => {
    const draft = await create(args);
    if (draft?.resume_draft_id) {
      router.push(`/dashboard/builder/${draft.resume_draft_id}`);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-rr-text">Resume Builder</h1>
          <p className="mt-1 text-sm text-rr-text-secondary">
            Build an ATS-ready resume from scratch or from one you&apos;ve uploaded.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-rr-accent px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-rr-accent-hover"
        >
          <FilePlus2 className="h-4 w-4" />
          New resume
        </button>
      </header>

      {error && <p className="text-[13px] text-rr-danger">{error}</p>}

      {loading ? (
        <p className="text-[13px] text-rr-text-muted">Loading…</p>
      ) : drafts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-rr-border-muted bg-rr-card p-10 text-center">
          <FileText className="mx-auto h-8 w-8 text-rr-text-muted" />
          <p className="mt-3 text-sm text-rr-text-secondary">No resumes yet.</p>
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-rr-accent hover:text-rr-accent-hover"
          >
            <FilePlus2 className="h-3.5 w-3.5" />
            Create your first resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {drafts.map((d) => (
            <div
              key={d.resume_draft_id}
              className="group flex items-center justify-between rounded-xl border border-rr-border-muted bg-rr-card p-4 transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => router.push(`/dashboard/builder/${d.resume_draft_id}`)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm font-semibold text-rr-text">{d.title}</p>
                <p className="mt-0.5 text-[11px] capitalize text-rr-text-muted">
                  {d.template_id}
                  {d.updated_on
                    ? ` · edited ${formatDistanceToNow(new Date(d.updated_on), { addSuffix: true })}`
                    : ""}
                </p>
              </button>
              <button
                type="button"
                aria-label={`Delete ${d.title}`}
                onClick={() => remove(d.resume_draft_id)}
                className="ml-2 rounded-md p-1.5 text-rr-text-muted opacity-0 transition hover:bg-rr-bg hover:text-rr-danger group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {dialogOpen && (
        <NewResumeDialog onClose={() => setDialogOpen(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
