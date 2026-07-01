"use client";

import { motion } from "framer-motion";
import { Rocket, ChevronsUpDown } from "lucide-react";
import { SIDEBAR_ITEMS, WORKSPACE } from "./tour-data";

/**
 * The app's navigation rail. Items linked to a tab switch the view (with a
 * sliding highlight that follows the active view); the rest are realistic,
 * inert chrome.
 */
export function Sidebar({
  active,
  onSelect,
  reduce,
}: {
  active: string;
  onSelect: (tabKey: string) => void;
  reduce: boolean;
}) {
  return (
    <aside className="hidden h-full w-full flex-col border-r border-rr-border-muted bg-rr-card p-3 lg:flex">
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-rr-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rr-accent text-white">
          <Rocket className="h-4 w-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[13px] font-semibold text-rr-text">ResumeRocket</span>
          <span className="block truncate text-[10px] font-medium uppercase tracking-[0.06em] text-rr-text-muted">
            {WORKSPACE.label}
          </span>
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-rr-text-muted" aria-hidden />
      </button>

      <nav aria-label="Workspace" className="mt-4 flex flex-1 flex-col gap-0.5">
        {SIDEBAR_ITEMS.map(({ label, icon: Icon, tabKey }) => {
          const isActive = tabKey != null && tabKey === active;
          const base =
            "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors";
          if (!tabKey) {
            return (
              <span key={label} className={`${base} text-rr-text-muted/70`} aria-disabled>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </span>
            );
          }
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(tabKey)}
              aria-current={isActive ? "page" : undefined}
              className={`${base} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent ${
                isActive
                  ? "text-rr-accent"
                  : "text-rr-text-secondary hover:bg-rr-bg-elevated hover:text-rr-text"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tour-side-active"
                  className="absolute inset-0 rounded-lg bg-rr-accent-light"
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.2, 0, 0, 1] }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" aria-hidden />
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-rr-border-muted p-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rr-accent/10 text-xs font-semibold text-rr-accent">
          {WORKSPACE.initials}
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[13px] font-medium text-rr-text">{WORKSPACE.user}</p>
          <p className="text-[11px] text-rr-text-muted">Free plan</p>
        </div>
      </div>
    </aside>
  );
}
