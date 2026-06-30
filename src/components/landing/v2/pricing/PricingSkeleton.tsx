export function PricingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-96 animate-pulse rounded-2xl border border-rr-border bg-rr-card"
        />
      ))}
    </div>
  );
}
