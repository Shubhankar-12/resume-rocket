import { ArrowRight } from "lucide-react";

/**
 * The single glass element in the top block. Announces a concrete capability
 * rather than a vague slogan, and links into the features section.
 */
export function AnnouncementBadge() {
  return (
    <a
      href="#features"
      className="glass-rr group inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm text-rr-text-secondary shadow-sm transition-colors hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2"
    >
      <span className="inline-flex items-center rounded-full bg-rr-accent px-2 py-0.5 text-xs font-semibold text-white">
        New
      </span>
      <span className="font-medium">GitHub project analysis is live</span>
      <ArrowRight
        className="h-3.5 w-3.5 text-rr-text-muted transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}
