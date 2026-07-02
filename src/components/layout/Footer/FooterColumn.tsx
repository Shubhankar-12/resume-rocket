"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FooterLink = {
  label: string;
  href?: string;
  soon?: boolean;
  onClick?: () => void;
};

function LinkItem({ link }: { link: FooterLink }) {
  if (link.soon) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-rr-text-muted">
        {link.label}
        <span className="rounded bg-rr-accent-light px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-rr-accent">
          Soon
        </span>
      </span>
    );
  }
  const inner = (
    <span className="group/link relative inline-block text-sm text-rr-text-secondary transition-colors hover:text-rr-text">
      {link.label}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-rr-accent transition-transform duration-200 group-hover/link:scale-x-100"
      />
    </span>
  );
  const focus =
    "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent";
  if (link.onClick) {
    return (
      <button type="button" onClick={link.onClick} className={focus}>
        {inner}
      </button>
    );
  }
  return (
    <Link href={link.href ?? "#"} className={focus}>
      {inner}
    </Link>
  );
}

/**
 * A footer link group. On mobile it's a collapsible accordion; from `md` up the
 * heading is inert and the list is always shown.
 */
export function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-rr-border/50 py-3 first:border-t-0 md:border-0 md:py-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent md:pointer-events-none"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-rr-text-muted">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-rr-text-muted transition-transform md:hidden",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      <ul className={cn("space-y-2.5 pt-3 md:block md:pt-4", open ? "block" : "hidden")}>
        {links.map((link) => (
          <li key={link.label}>
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}
