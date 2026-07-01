"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FaqItem } from "../part3-faq-data";

/** Wraps the portions of `text` that match `query` in a subtle accent mark. */
function Highlighted({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  const out: React.ReactNode[] = [];
  let i = 0;
  for (;;) {
    const idx = lower.indexOf(ql, i);
    if (idx === -1) {
      out.push(text.slice(i));
      break;
    }
    if (idx > i) out.push(text.slice(i, idx));
    out.push(
      <mark key={idx} className="rounded-[2px] bg-rr-accent-light text-rr-accent">
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    i = idx + q.length;
  }
  return <>{out}</>;
}

export function FAQItem({
  item,
  isOpen,
  onToggle,
  query = "",
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  query?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const btnId = `faq-btn-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border-b border-rr-border-muted last:border-b-0">
      <h3 className="m-0">
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-4 focus-visible:ring-offset-rr-bg-elevated"
        >
          <span
            className={cn(
              "text-[15px] font-medium leading-snug transition-colors",
              isOpen ? "text-rr-text" : "text-rr-text group-hover:text-rr-accent"
            )}
          >
            <Highlighted text={item.question} query={query} />
          </span>
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-rr-text-muted transition-all duration-300 group-hover:bg-rr-accent-light group-hover:text-rr-accent",
              isOpen && "rotate-180 bg-rr-accent-light text-rr-accent"
            )}
            aria-hidden
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-5 pr-10 text-[14px] leading-relaxed text-rr-text-secondary">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
