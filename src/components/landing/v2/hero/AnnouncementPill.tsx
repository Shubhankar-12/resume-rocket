import { Sparkles } from "lucide-react";

export function AnnouncementPill() {
  return (
    <span className="glass-rr inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-rr-text-secondary">
      <Sparkles className="h-3.5 w-3.5 text-rr-accent" aria-hidden />
      AI-Powered Resume Optimization Platform
    </span>
  );
}
