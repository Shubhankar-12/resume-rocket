"use client";

import { FAQ_CATEGORIES, type FaqItem } from "../part3-faq-data";
import { FAQItem } from "./FAQItem";

export function FaqAccordion({
  items,
  openId,
  onToggle,
  query = "",
  grouped = false,
}: {
  items: FaqItem[];
  openId: string | null;
  onToggle: (id: string) => void;
  query?: string;
  /** In search mode, label each category so cross-category results stay legible. */
  grouped?: boolean;
}) {
  if (!grouped) {
    return (
      <div>
        {items.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => onToggle(item.id)}
            query={query}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {FAQ_CATEGORIES.map((cat) => {
        const inCat = items.filter((it) => it.category === cat.id);
        if (inCat.length === 0) return null;
        return (
          <div key={cat.id}>
            <p className="mb-1 flex items-center gap-2 text-eyebrow uppercase text-rr-text-muted">
              <cat.icon className="h-3.5 w-3.5" aria-hidden />
              {cat.title}
            </p>
            {inCat.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => onToggle(item.id)}
                query={query}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
