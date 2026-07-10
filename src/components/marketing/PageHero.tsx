import type { ReactNode } from "react";
import { SectionHeading } from "@/components/landing/v2/shared/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  meta?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
      <SectionHeading id="page-hero" eyebrow={eyebrow} title={title} intro={intro} />
      {meta && (
        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3 text-sm text-rr-text-muted">
          {meta}
        </div>
      )}
    </section>
  );
}
