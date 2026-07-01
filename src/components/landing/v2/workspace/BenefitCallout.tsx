import type { Benefit } from "./workspace-data";

/** An editorial benefit — icon, headline, one sentence. No card; the parent
 * supplies the dividers. Typography carries the hierarchy. */
export function BenefitCallout({ benefit }: { benefit: Benefit }) {
  const { icon: Icon, title, body } = benefit;
  return (
    <div>
      <Icon className="h-5 w-5 text-rr-accent" aria-hidden />
      <h3 className="mt-3 text-sm font-semibold text-rr-text">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-rr-text-secondary">{body}</p>
    </div>
  );
}
