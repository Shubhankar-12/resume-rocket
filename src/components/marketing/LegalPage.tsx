import type { ReactNode } from "react";
import { Calendar } from "lucide-react";
import { PageHero } from "./PageHero";

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        meta={
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden />
            Last updated: {lastUpdated}
          </span>
        }
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 md:px-8">
        <article className="rounded-2xl border border-rr-border bg-rr-card p-6 md:p-10">
          {children}
        </article>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="mb-4 font-display text-xl font-semibold tracking-[-0.01em] text-rr-text">
        {heading}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-rr-text-secondary">{children}</div>
    </section>
  );
}

export function LegalSubsection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-base font-semibold text-rr-text">{heading}</h3>
      <div className="space-y-2 text-[15px] leading-relaxed text-rr-text-secondary">{children}</div>
    </div>
  );
}
