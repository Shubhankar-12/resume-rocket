"use client";

import { motion, useReducedMotion } from "framer-motion";
import { UploadCloud, FileText, Check } from "lucide-react";

/** Stage 1 — a drag-and-drop uploader whose progress fills to complete. */
export function UploadPreview() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="rounded-xl border border-rr-border-muted bg-rr-card p-4 shadow-xs">
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-rr-border py-6 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rr-accent-light text-rr-accent">
          <UploadCloud className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-3 text-sm font-medium text-rr-text">Drop your resume, or browse</p>
        <p className="text-xs text-rr-text-muted">PDF or DOCX, up to 5 MB</p>
      </div>

      <div className="mt-4 rounded-lg border border-rr-border-muted p-3">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 shrink-0 text-rr-accent" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-rr-text">
              Senior_Frontend_Resume.pdf
            </p>
            <p className="text-[11px] text-rr-text-muted">248 KB</p>
          </div>
          <motion.span
            className="flex items-center gap-1 text-[11px] font-medium text-rr-success"
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : 1.2, duration: 0.3 }}
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
            Upload complete
          </motion.span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-rr-border-muted">
          <motion.div
            className="h-full rounded-full bg-rr-accent"
            initial={{ width: reduce ? "100%" : "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.2, ease: [0.2, 0, 0, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
