"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarClock } from "lucide-react";

type Card = { id: string; role: string; company: string; badge?: string };

const MOVER: Card = {
  id: "mover",
  role: "Frontend Engineer",
  company: "Acme Labs",
  badge: "Friday",
};
const APPLIED: Card[] = [{ id: "a1", role: "UI Engineer", company: "Globex" }];
const OFFER: Card[] = [{ id: "o1", role: "Product Engineer", company: "Northwind" }];
const REJECTED: Card[] = [{ id: "r1", role: "Web Developer", company: "Initech" }];

const DOT: Record<string, string> = {
  Applied: "bg-rr-accent",
  Interview: "bg-rr-info",
  Offer: "bg-rr-success",
  Rejected: "bg-rr-text-muted",
};

function KanbanCard({ card, reduce }: { card: Card; reduce: boolean }) {
  const isMover = card.id === "mover";
  return (
    <motion.div
      layoutId={isMover ? "tour-mover" : undefined}
      layout={isMover ? true : undefined}
      transition={{ duration: reduce ? 0 : 0.6, ease: [0.2, 0, 0, 1] }}
      className={`cursor-grab rounded-lg border bg-rr-card p-2.5 transition-shadow hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing ${
        card.badge ? "border-rr-info/40 ring-1 ring-rr-info/15" : "border-rr-border-muted"
      }`}
    >
      <p className="text-[12px] font-semibold leading-tight text-rr-text">{card.role}</p>
      <p className="text-[10px] text-rr-text-muted">{card.company}</p>
      {card.badge && (
        <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-rr-info/10 px-1.5 py-0.5 text-[10px] font-medium text-rr-info">
          <CalendarClock className="h-2.5 w-2.5" aria-hidden />
          {card.badge}
        </span>
      )}
    </motion.div>
  );
}

export function TrackerPanel() {
  const reduce = useReducedMotion() ?? false;
  const [moved, setMoved] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setMoved(true), 900);
    return () => clearTimeout(id);
  }, [reduce]);

  const columns: { name: string; cards: Card[] }[] = [
    { name: "Applied", cards: moved ? APPLIED : [...APPLIED, MOVER] },
    { name: "Interview", cards: moved ? [MOVER] : [] },
    { name: "Offer", cards: OFFER },
    { name: "Rejected", cards: REJECTED },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.name} className="rounded-xl bg-rr-bg-elevated p-2.5">
          <div className="mb-2 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[col.name]}`} aria-hidden />
            <span className="text-[11px] font-medium text-rr-text-secondary">{col.name}</span>
            <span className="ml-auto text-[11px] font-semibold text-rr-text-muted">
              {col.cards.length}
            </span>
          </div>
          <div className="space-y-2">
            {col.cards.map((card) => (
              <KanbanCard key={card.id} card={card} reduce={reduce} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
