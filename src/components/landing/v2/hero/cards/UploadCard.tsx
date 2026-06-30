"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import { GlassCard } from "../GlassCard";
import { UPLOAD_DEMO } from "../../hero-demo-data";

export function UploadCard() {
  const reduce = useReducedMotion();
  return (
    <GlassCard className="w-64">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
          <FileText className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-rr-text">{UPLOAD_DEMO.fileName}</p>
          <p className="text-xs text-rr-text-muted">Uploading…</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-rr-border-muted">
        <motion.div
          className="h-full rounded-full bg-rr-accent"
          initial={{ width: reduce ? "100%" : "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
        />
      </div>
    </GlassCard>
  );
}
