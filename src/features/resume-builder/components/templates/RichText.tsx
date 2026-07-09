import { sanitizeHtml } from "../../lib/sanitize";

/**
 * Renders sanitized resume rich text. Pure/presentational — used by both the
 * client preview and the server print page. Styles lists for print/ATS.
 */
export function RichText({ html, className = "" }: { html: string; className?: string }) {
  const clean = sanitizeHtml(html);
  if (!clean) return null;
  return (
    <div
      className={`[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_p]:mb-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
