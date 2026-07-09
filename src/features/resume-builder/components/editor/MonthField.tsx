"use client";

const inputClass =
  "w-full rounded-md border border-rr-border-muted bg-rr-bg px-2.5 py-1.5 text-sm text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent";

const isMonth = (v: string) => /^\d{4}-\d{2}$/.test(v);

/**
 * Month/year picker. Stores "YYYY-MM" (native month input). Legacy free-text
 * values are preserved (shown as a hint) until the user picks a month.
 */
export function MonthField({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-[11px] font-medium text-rr-text-muted">{label}</span>
      )}
      <input
        type="month"
        className={inputClass}
        value={isMonth(value) ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && !isMonth(value) && (
        <span className="mt-0.5 block text-[10px] text-rr-text-muted">Current: {value}</span>
      )}
    </label>
  );
}
