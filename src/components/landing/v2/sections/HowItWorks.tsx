"use client";

import { useCallback, useState } from "react";
import { WorkflowRail } from "../how/WorkflowRail";
import { WorkflowCanvas } from "../how/WorkflowCanvas";

/**
 * "How ResumeRocket works" — a sticky editorial rail beside a scrolling canvas
 * of connected product previews. The rail tracks whichever stage is in view.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const onEnter = useCallback((index: number) => setActive(index), []);

  return (
    <section id="how" aria-labelledby="how-h" className="bg-rr-bg-elevated py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-16">
          <WorkflowRail active={active} />
          <WorkflowCanvas active={active} onEnter={onEnter} />
        </div>
      </div>
    </section>
  );
}
