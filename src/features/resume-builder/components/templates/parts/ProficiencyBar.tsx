/** A simple filled proficiency bar for designer templates. `pct` is 0..100. */
export function ProficiencyBar({
  pct,
  color,
  track = "#e5e7eb",
}: {
  pct: number;
  color: string;
  track?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: track }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: color }}
      />
    </div>
  );
}
