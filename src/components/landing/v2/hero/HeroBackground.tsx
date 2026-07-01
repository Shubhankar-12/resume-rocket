/**
 * Very quiet atmosphere: a near-white base, a few large blurred colour orbs,
 * a faint fading grid, and a hint of grain. Nothing loud — the product carries
 * the colour.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-rr-bg"
    >
      {/* soft mesh orbs */}
      <div className="absolute -left-32 -top-40 h-[40rem] w-[40rem] rounded-full bg-rr-accent/10 blur-3xl animate-mesh-drift" />
      <div className="absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-rr-info/10 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-[hsl(270_70%_60%/0.06)] blur-3xl" />

      {/* fading dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_55%_at_50%_10%,black,transparent)]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--rr-border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
