import DOMPurify from "isomorphic-dompurify";

// Resume rich text allows only inline emphasis + simple lists (ATS + print safe).
const ALLOWED_TAGS = ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li"];

/** Sanitize rich-text HTML down to the resume allowlist (no attributes, no links/scripts). */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR: [] });
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
