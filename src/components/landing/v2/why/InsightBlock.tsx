import type { Insight } from "./why-data";

/**
 * A lightweight editorial insight — icon, title, one sentence. No card, no
 * border of its own; the parent supplies thin dividers between blocks.
 */
export function InsightBlock({ insight }: { insight: Insight }) {
  const { icon: Icon, title, body } = insight;
  return (
    <div>
      <Icon className="h-5 w-5 text-rr-text-muted" aria-hidden />
      <h3 className="mt-3 text-sm font-semibold text-rr-text">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-rr-text-secondary">{body}</p>
    </div>
  );
}
