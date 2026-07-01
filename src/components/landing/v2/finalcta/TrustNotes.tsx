import { FileText, Github, Globe, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Small reassurances under the CTA — each one a capability that ships today. */
const NOTES: { icon: LucideIcon; label: string }[] = [
  { icon: FileText, label: "Supports PDF & DOCX" },
  { icon: Github, label: "Sign in with GitHub" },
  { icon: Globe, label: "Regional pricing (INR & USD)" },
  { icon: Sparkles, label: "Free plan to start" },
];

export function TrustNotes() {
  return (
    <ul
      className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-rr-text-muted"
      aria-label="What's included"
    >
      {NOTES.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-rr-accent/70" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}
