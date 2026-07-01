"use client";

import { Search, Bell, Moon, ChevronRight } from "lucide-react";
import { WORKSPACE, CREDITS } from "./tour-data";

/** The app header: breadcrumb, search, notifications, theme, credits, profile. */
export function Topbar({ activeLabel }: { activeLabel: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-rr-border-muted bg-rr-card px-4 py-2.5">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-[13px]">
        <span className="truncate text-rr-text-muted">{WORKSPACE.label}</span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-rr-text-muted" aria-hidden />
        <span className="truncate font-medium text-rr-text">{activeLabel}</span>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {/* search */}
        <div className="hidden items-center gap-2 rounded-lg border border-rr-border-muted bg-rr-bg-elevated px-2.5 py-1.5 text-rr-text-muted md:flex">
          <Search className="h-3.5 w-3.5" aria-hidden />
          <span className="text-xs">Search</span>
          <kbd className="rounded border border-rr-border-muted bg-rr-card px-1 text-[10px] font-medium">
            ⌘K
          </kbd>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-rr-text-muted transition-colors hover:bg-rr-bg-elevated hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          <Bell className="h-4 w-4" aria-hidden />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rr-accent"
            aria-hidden
          />
        </button>

        <button
          type="button"
          aria-label="Toggle theme"
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-rr-text-muted transition-colors hover:bg-rr-bg-elevated hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent sm:flex"
        >
          <Moon className="h-4 w-4" aria-hidden />
        </button>

        <span className="hidden items-center gap-1.5 rounded-full bg-rr-accent-light px-2.5 py-1 text-xs font-semibold text-rr-accent sm:inline-flex">
          {CREDITS.remaining} credits
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rr-accent/10 text-xs font-semibold text-rr-accent">
          {WORKSPACE.initials}
        </span>
      </div>
    </div>
  );
}
