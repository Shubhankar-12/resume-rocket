import type { BuilderLink } from "../../types";

const normalizeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

/**
 * Inline clickable links (no wrapper): label is the anchor text, URL is embedded.
 * Used for header (basics) links and, via ProjectLinks, for project links.
 */
export function InlineLinks({ links, accent }: { links: BuilderLink[]; accent: string }) {
  const valid = (links ?? []).filter((l) => l.url && l.url.trim());
  if (!valid.length) return null;
  return (
    <>
      {valid.map((l, i) => (
        <span key={i}>
          <a
            href={normalizeUrl(l.url.trim())}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: accent }}
          >
            {l.label && l.label.trim() ? l.label.trim() : l.url.trim()}
          </a>
          {i < valid.length - 1 ? "  ·  " : ""}
        </span>
      ))}
    </>
  );
}
