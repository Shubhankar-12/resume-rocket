"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, isNavActive } from "./nav-items";

export function MobileNav({ pathname }: { pathname: string }) {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-rr-border-muted bg-rr-card lg:hidden"
    >
      {items.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors",
              active ? "text-rr-accent" : "text-rr-text-muted hover:text-rr-text"
            )}
          >
            <item.icon className="h-5 w-5" aria-hidden />
            <span>{item.name.split(" ")[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
