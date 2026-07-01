import { HiringPipeline } from "./HiringPipeline";
import { InsightBlock } from "./InsightBlock";
import { WHY_EYEBROW, WHY_HEADLINE, WHY_INTRO, WHY_TAKEAWAY, INSIGHTS } from "./why-data";

/**
 * "Why great candidates never hear back" — the educational beat after the Hero.
 * Editorial 40/60 split (copy left, hiring pipeline right) with a lightweight
 * magazine row of insights below. Keeps id="problem" for the section contract.
 */
export function WhyResumesFail() {
  return (
    <section
      id="problem"
      aria-labelledby="why-h"
      className="relative overflow-hidden bg-rr-bg pb-20 pt-10 md:pb-28 md:pt-14"
    >
      {/* soft indigo tail continuing the Hero's atmosphere into this section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-rr-accent/[0.04] to-transparent"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          {/* LEFT — the argument */}
          <div className="lg:pt-6">
            <p className="text-eyebrow uppercase text-rr-accent">{WHY_EYEBROW}</p>
            <h2
              id="why-h"
              className="mt-4 max-w-[16ch] font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-rr-text sm:text-4xl lg:text-[2.75rem]"
            >
              {WHY_HEADLINE}
            </h2>

            <div className="mt-6 max-w-[46ch] space-y-4">
              {WHY_INTRO.map((p) => (
                <p key={p} className="text-base leading-relaxed text-rr-text-secondary">
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="mt-8 max-w-[44ch] border-l-2 border-rr-accent pl-4 text-base font-medium leading-relaxed text-rr-text">
              {WHY_TAKEAWAY}
            </blockquote>
          </div>

          {/* RIGHT — the pipeline (dominant visual) */}
          <div className="lg:pl-4">
            <HiringPipeline />
          </div>
        </div>

        {/* insights — magazine row, thin dividers, no cards */}
        <div className="mt-16 border-t border-rr-border pt-10 md:mt-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-rr-border">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.title}
                className="border-t border-rr-border-muted pt-6 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <InsightBlock insight={insight} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
