import type { BuilderLink } from "../../types";
import { InlineLinks } from "./InlineLinks";

/** Renders project links on their own line; the label is the anchor text, the URL is embedded. */
export function ProjectLinks({ links, accent }: { links: BuilderLink[]; accent: string }) {
  const hasLinks = (links ?? []).some((l) => l.url && l.url.trim());
  if (!hasLinks) return null;
  return (
    <p className="text-[12px]">
      <InlineLinks links={links} accent={accent} />
    </p>
  );
}
