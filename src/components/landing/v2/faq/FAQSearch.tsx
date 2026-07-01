"use client";

import { Search, X } from "lucide-react";

export function FAQSearch({
  query,
  onChange,
}: {
  query: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rr-text-muted"
        aria-hidden
      />
      <input
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search questions"
        placeholder="Search questions..."
        className="h-12 w-full rounded-xl border border-rr-border bg-rr-card pl-11 pr-10 text-sm text-rr-text transition-colors placeholder:text-rr-text-muted hover:border-rr-accent/40 focus-visible:border-rr-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent/30 [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-rr-text-muted transition-colors hover:bg-rr-bg hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
