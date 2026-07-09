import type { ReactNode } from "react";

/** The shared dashboard widget shell: rounded rr card with an optional uppercase title. */
export function WidgetCard({
  title,
  className = "",
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-rr-border-muted bg-rr-card p-4 transition-shadow hover:shadow-md ${className}`}
    >
      {title && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
