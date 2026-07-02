import Link from "next/link";

/**
 * Wordmark + small product label. A restrained monogram tile carries the mark
 * so the brand reads instantly without oversized branding.
 */
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="ResumeRocket home"
      className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent text-[13px] font-bold text-white transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none">
        R
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-rr-text">
          ResumeRocket
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-rr-text-muted">
          AI Career Platform
        </span>
      </span>
    </Link>
  );
}
