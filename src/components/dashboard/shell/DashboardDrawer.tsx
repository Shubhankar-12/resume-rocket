"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { NAV_ITEMS, isNavActive } from "./nav-items";
import { initialsOf, type DashboardUser } from "./user";

export function DashboardDrawer({
  pathname,
  user,
  open,
  onOpenChange,
}: {
  pathname: string;
  user: DashboardUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-72 flex-col p-0 lg:hidden">
        {/* Brand header */}
        <div className="flex h-16 items-center gap-2 border-b border-rr-border-muted px-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rr-accent text-white">
            <Rocket className="h-4 w-4" aria-hidden />
          </span>
          <SheetTitle className="font-display text-base font-bold">ResumeRocket</SheetTitle>
        </div>

        {/* Nav */}
        <nav aria-label="Primary" className="flex-1 space-y-1 overflow-auto px-2 py-3">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
                    active
                      ? "bg-rr-accent-light text-rr-accent"
                      : "text-rr-text-secondary hover:bg-rr-bg-elevated hover:text-rr-text"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{item.name}</span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        {/* User chip */}
        <div className="border-t border-rr-border-muted p-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rr-accent/10 text-xs font-semibold text-rr-accent">
              {initialsOf(user)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-rr-text">
                {user?.name ?? "Your account"}
              </p>
              <p className="truncate text-[11px] text-rr-text-muted">{user?.plan ?? "Free plan"}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
