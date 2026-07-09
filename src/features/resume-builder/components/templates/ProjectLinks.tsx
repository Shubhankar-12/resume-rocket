import type { BuilderLink } from "../../types";

const normalizeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

/** Renders project links as clickable anchors; the label is the anchor text, the URL is embedded. */
export function ProjectLinks({ links, accent }: { links: BuilderLink[]; accent: string }) {
  const valid = (links ?? []).filter((l) => l.url && l.url.trim());
  if (!valid.length) return null;
  return (
    <p className="text-[12px]">
      {valid.map((l, i) => (
        <span key={i}>
          {i > 0 && <span className="text-gray-400">{"  ·  "}</span>}
          <a
            href={normalizeUrl(l.url.trim())}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: accent }}
          >
            {l.label && l.label.trim() ? l.label.trim() : l.url.trim()}
          </a>
        </span>
      ))}
    </p>
  );
}
