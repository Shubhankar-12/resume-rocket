import type { BuilderLink } from "../../types";

const normalizeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);
const displayUrl = (url: string) =>
  url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");

/**
 * Inline clickable links (no wrapper). ATS-friendly: the URL is always visible
 * as text (so text-based parsers extract profile/project URLs), and the human
 * label, when present, prefixes it — e.g. "GitHub (github.com/alex)".
 */
export function InlineLinks({ links, accent }: { links: BuilderLink[]; accent: string }) {
  const valid = (links ?? []).filter((l) => l.url && l.url.trim());
  if (!valid.length) return null;
  return (
    <>
      {valid.map((l, i) => {
        const clean = displayUrl(l.url);
        const label = l.label && l.label.trim() ? l.label.trim() : "";
        return (
          <span key={i}>
            <a
              href={normalizeUrl(l.url.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: accent }}
            >
              {label ? `${label} (${clean})` : clean}
            </a>
            {i < valid.length - 1 ? "  ·  " : ""}
          </span>
        );
      })}
    </>
  );
}
