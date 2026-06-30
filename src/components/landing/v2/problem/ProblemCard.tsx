export function ProblemCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-rr-border bg-rr-card p-5 transition-shadow hover:shadow-[0_12px_28px_-10px_hsl(240_24%_10%/0.12)]">
      <h3 className="text-sm font-semibold text-rr-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-rr-text-secondary">{body}</p>
    </div>
  );
}
