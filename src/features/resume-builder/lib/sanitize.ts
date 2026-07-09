// Dependency-free HTML sanitizer for resume rich text. No jsdom / DOMPurify so
// it runs identically on the server (print page / SSR) and the client without
// pulling native/ESM deps that break on serverless runtimes.

// Resume rich text allows only inline emphasis + simple lists (ATS + print safe).
const ALLOWED_TAGS = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li"]);

/**
 * Sanitize rich-text HTML down to the resume allowlist: strips <script>/<style>
 * blocks, comments/doctypes, ALL attributes, and every non-allowlisted tag
 * (keeping their inner text). Since no attributes survive, there is no href /
 * event-handler / style vector.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<![^>]*>/g, "")
    .replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?>/g, (_m, slash: string, tag: string) =>
      ALLOWED_TAGS.has(tag.toLowerCase()) ? `<${slash}${tag.toLowerCase()}>` : ""
    );
}

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Wrap a list of bullet strings into a sanitized-friendly <ul> (for AI polish output). */
export function bulletsToHtml(bullets: string[]): string {
  const items = bullets.map((b) => b.trim()).filter(Boolean);
  if (!items.length) return "";
  return `<ul>${items.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;
}

/** Flatten rich-text HTML to plain text (for sending to the AI). */
export function htmlToText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<\/(p|div|li|ul|ol)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\n{2,}/g, "\n")
    .trim();
}
