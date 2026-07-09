"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, isNavActive } from "./nav-items";
import { initialsOf, type DashboardUser } from "./user";

export function DashboardSidebar({
  pathname,
  user,
  collapsed,
  onToggle,
}: {
  pathname: string;
  user: DashboardUser | null;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-rr-border-muted bg-rr-card transition-[width] duration-300 lg:flex",
        collapsed ? "w-[72px]" : "w-60"
      )}
    >
      {/* Brand + collapse */}
      <div className="flex h-16 items-center justify-between px-3">
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rr-accent text-white">
            <Rocket className="h-4 w-4" aria-hidden />
          </span>
          {!collapsed && (
            <span className="font-display text-base font-bold text-rr-text">ResumeRocket</span>
          )}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1 text-rr-text-muted hover:bg-rr-bg-elevated hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-auto px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
                active ? "text-rr-accent" : "text-rr-text-secondary hover:text-rr-text"
              )}
            >
              {active && (
                <motion.span
                  layoutId="dash-side-active"
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-rr-accent-light"
                  transition={
                    reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }
                  }
                />
              )}
              <item.icon className="relative h-5 w-5 shrink-0" aria-hidden />
              {!collapsed && <span className="relative">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User chip (display only; logout lives in the topbar menu) */}
      <div className="border-t border-rr-border-muted p-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rr-accent/10 text-xs font-semibold text-rr-accent">
            {initialsOf(user)}
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-rr-text">
                {user?.name ?? "Your account"}
              </p>
              <p className="truncate text-[11px] text-rr-text-muted">{user?.plan ?? "Free plan"}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
