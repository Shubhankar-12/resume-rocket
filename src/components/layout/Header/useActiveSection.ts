"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of whichever tracked section currently owns the
 * top of the viewport, so the nav can show an active indicator. Passive and
 * cleaned up; no work when the ids aren't on the page (e.g. sub-routes).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      // Bias the "active" zone toward the upper third of the viewport.
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.5, 1] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
