"use client";

import { useMemo, useState } from "react";
import { captureEvent } from "@/lib/analytics/posthog";
import { FAQSearch } from "../faq/FAQSearch";
import { FAQCategories } from "../faq/FAQCategories";
import { FaqAccordion } from "../faq/FaqAccordion";
import { HelpBox } from "../faq/HelpBox";
import { FAQ_ITEMS, FAQ_CATEGORIES, type FaqCategoryId } from "../part3-faq-data";

const COUNTS = FAQ_ITEMS.reduce(
  (acc, it) => ({ ...acc, [it.category]: (acc[it.category] ?? 0) + 1 }),
  {} as Record<FaqCategoryId, number>
);

export function FAQ() {
  const [active, setActive] = useState<FaqCategoryId>(FAQ_CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const searching = query.trim().length > 0;

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return FAQ_ITEMS.filter(
      (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q)
    );
  }, [query]);

  const browseItems = useMemo(() => FAQ_ITEMS.filter((it) => it.category === active), [active]);

  const dimmed = useMemo(() => {
    if (!searching) return undefined;
    const withMatches = new Set(matches.map((m) => m.category));
    return new Set(FAQ_CATEGORIES.map((c) => c.id).filter((id) => !withMatches.has(id)));
  }, [searching, matches]);

  const selectCategory = (id: FaqCategoryId) => {
    setActive(id);
    setQuery(""); // leaving search mode to browse a topic
  };

  const toggle = (id: string) => {
    setOpenId((cur) => {
      const next = cur === id ? null : id;
      if (next) captureEvent("faq_opened", { question_id: id });
      return next;
    });
  };

  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-rr-bg-elevated py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        {/* heading */}
        <div className="max-w-2xl">
          <p className="text-eyebrow uppercase text-rr-accent">FAQ</p>
          <h2
            id="faq-h"
            className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-rr-text sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rr-text-secondary">
            Answers to common questions about resume analysis, credits, billing, privacy, and
            ResumeRocket.
          </p>
        </div>

        {/* two-column knowledge center */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:mt-14 lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-14">
          {/* category nav — sticky on desktop, scrollable chips on smaller screens */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <FAQCategories
              active={active}
              counts={COUNTS}
              dimmed={dimmed}
              onSelect={selectCategory}
            />
          </div>

          {/* search + answers */}
          <div className="min-w-0">
            <FAQSearch query={query} onChange={setQuery} />

            <div className="mt-6">
              {searching ? (
                matches.length > 0 ? (
                  <FaqAccordion
                    items={matches}
                    openId={openId}
                    onToggle={toggle}
                    query={query}
                    grouped
                  />
                ) : (
                  <div className="rounded-2xl border border-dashed border-rr-border py-14 text-center">
                    <p className="font-display text-lg font-semibold text-rr-text">
                      No matching questions
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-rr-text-secondary">
                      Try searching another keyword or browse one of the categories.
                    </p>
                  </div>
                )
              ) : (
                <FaqAccordion items={browseItems} openId={openId} onToggle={toggle} />
              )}
            </div>
          </div>
        </div>

        <HelpBox />
      </div>
    </section>
  );
}
