import { EcosystemDiagram } from "./EcosystemDiagram";
import { WorkflowComparison } from "./WorkflowComparison";
import { BenefitCallout } from "./BenefitCallout";
import { EYEBROW, HEADLINE, SUBCOPY, BENEFITS } from "./workspace-data";

/**
 * "Everything in one workspace" — the strategic-advantage section. The
 * ecosystem diagram is the hero visual; a workflow comparison and four
 * editorial benefit callouts carry the integration argument. Keeps id="features".
 */
export function WorkspaceSection() {
  return (
    <section id="features" aria-labelledby="ws-h" className="bg-rr-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* top — editorial split: diagram left, argument right */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <EcosystemDiagram />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-eyebrow uppercase text-rr-accent">{EYEBROW}</p>
            <h2
              id="ws-h"
              className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-rr-text sm:text-4xl lg:text-[2.75rem]"
            >
              {HEADLINE.lead}
              <br />
              <span className="text-rr-accent">{HEADLINE.accent}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-rr-text-secondary">
              {SUBCOPY}
            </p>
          </div>
        </div>

        {/* workflow comparison */}
        <div className="mt-20 border-t border-rr-border pt-12 md:mt-24">
          <div className="mb-10 grid gap-4 md:grid-cols-2 md:gap-16">
            <h3 className="font-display text-xl font-semibold leading-[1.15] tracking-[-0.01em] text-rr-text sm:text-2xl">
              The same job — without the tool-switching.
            </h3>
            <p className="max-w-[42ch] text-sm leading-relaxed text-rr-text-secondary md:self-end">
              What a job search normally scatters across five disconnected tools happens here in one
              continuous flow.
            </p>
          </div>
          <WorkflowComparison />
        </div>

        {/* benefit callouts — editorial, not cards */}
        <div className="mt-16 border-t border-rr-border pt-10 md:mt-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-rr-border">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="border-t border-rr-border-muted pt-6 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <BenefitCallout benefit={benefit} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
