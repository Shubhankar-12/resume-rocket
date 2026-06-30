"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { captureEvent } from "@/lib/analytics/posthog";
import { FAQ_CATEGORIES, type FaqItem } from "../part3-faq-data";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  const toggle = (item: FaqItem) => {
    setOpenId((cur) => {
      const next = cur === item.id ? null : item.id;
      if (next) captureEvent("faq_opened", { question_id: item.id });
      return next;
    });
  };

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rr-text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search questions"
          placeholder="Search questions"
          className="h-11 w-full rounded-xl border border-rr-border bg-rr-card pl-9 pr-3 text-sm text-rr-text placeholder:text-rr-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        />
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-8">
        {FAQ_CATEGORIES.map((cat) => {
          const inCat = filtered.filter((it) => it.category === cat);
          if (inCat.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-eyebrow uppercase text-rr-text-muted">{cat}</p>
              <div className="mt-3 divide-y divide-rr-border overflow-hidden rounded-2xl border border-rr-border bg-rr-card">
                {inCat.map((item) => {
                  const open = openId === item.id;
                  return (
                    <div key={item.id}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`faq-${item.id}`}
                          onClick={() => toggle(item)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
                        >
                          {item.question}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-rr-text-muted transition-transform",
                              open && "rotate-180"
                            )}
                            aria-hidden
                          />
                        </button>
                      </h3>
                      {open && (
                        <div
                          id={`faq-${item.id}`}
                          role="region"
                          className="px-5 pb-4 text-sm leading-relaxed text-rr-text-secondary"
                        >
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-rr-text-muted">
            No questions match “{query}”. Try a different search.
          </p>
        )}
      </div>
    </div>
  );
}
