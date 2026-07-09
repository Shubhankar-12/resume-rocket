"use client";

import { useState } from "react";
import { ArrowLeft, Download, Eye, PencilLine, Palette } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useResumeDraft } from "../hooks/useResumeDraft";
import { SectionList } from "./editor/SectionList";
import { ResumePreview } from "./preview/ResumePreview";
import { TemplateGallery } from "./preview/TemplateGallery";

export function ResumeBuilderEditor({ id }: { id: string }) {
  const { draft, loading, error, saving, update } = useResumeDraft(id);
  const { exportPageToPdf, isExporting } = usePdfExport();
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [showDesign, setShowDesign] = useState(false);

  if (loading) return <p className="text-[13px] text-rr-text-muted">Loading resume…</p>;
  if (error || !draft)
    return <p className="text-[13px] text-rr-danger">{error ?? "Resume not found."}</p>;

  const download = () =>
    exportPageToPdf(`/print-resume/${id}?template=${draft.template_id}`, draft.title || "resume");

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Link
          href="/dashboard/builder"
          className="rounded-md p-1.5 text-rr-text-muted hover:bg-rr-bg-elevated hover:text-rr-text"
          aria-label="Back to resumes"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <input
          value={draft.title}
          onChange={(e) => update({ title: e.target.value })}
          className="min-w-0 flex-1 rounded-md bg-transparent px-1.5 py-1 text-base font-semibold text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          aria-label="Resume title"
        />
        <span className="text-[11px] text-rr-text-muted">{saving ? "Saving…" : "Saved"}</span>
        <button
          type="button"
          onClick={() => setShowDesign((s) => !s)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[13px] font-medium transition-colors",
            showDesign
              ? "border-rr-accent bg-rr-accent-light text-rr-accent"
              : "border-rr-border-muted bg-rr-card text-rr-text-secondary hover:border-rr-accent/40"
          )}
        >
          <Palette className="h-3.5 w-3.5" />
          Design
        </button>
        <button
          type="button"
          onClick={download}
          disabled={isExporting}
          className="inline-flex items-center gap-1.5 rounded-lg bg-rr-accent px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-rr-accent-hover disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          {isExporting ? "Exporting…" : "Download PDF"}
        </button>
      </div>

      {/* Mobile view toggle */}
      <div className="mb-3 flex gap-1 rounded-lg border border-rr-border-muted bg-rr-card p-1 lg:hidden">
        {(["edit", "preview"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setMobileView(v)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[13px] font-medium capitalize transition-colors",
              mobileView === v ? "bg-rr-accent-light text-rr-accent" : "text-rr-text-secondary"
            )}
          >
            {v === "edit" ? (
              <PencilLine className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {v}
          </button>
        ))}
      </div>

      {/* Two-pane */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className={cn(
            "min-h-0 overflow-auto pr-1",
            mobileView === "edit" ? "block" : "hidden",
            "lg:block"
          )}
        >
          {showDesign && (
            <div className="mb-3 rounded-lg border border-rr-border-muted bg-rr-card p-3">
              <TemplateGallery resume={draft} update={update} />
            </div>
          )}
          <SectionList draft={draft} update={update} />
        </div>

        <div className={cn("min-h-0", mobileView === "preview" ? "block" : "hidden", "lg:block")}>
          <ResumePreview resume={draft} />
        </div>
      </div>
    </div>
  );
}
