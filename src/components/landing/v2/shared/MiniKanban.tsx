export function MiniKanban({
  columns,
}: {
  columns: readonly { readonly column: string; readonly cards: readonly string[] }[];
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {columns.map((col) => (
        <div key={col.column} className="min-w-0">
          <p className="mb-1 truncate text-[10px] font-medium text-rr-text-muted">{col.column}</p>
          <div className="space-y-1">
            {col.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-md border border-rr-border bg-rr-card p-1.5 text-[10px] leading-tight text-rr-text-secondary"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
