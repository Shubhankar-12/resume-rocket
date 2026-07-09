"use client";

import { ChevronRight } from "lucide-react";
import { ThemeSwitcher } from "@/components/layout/Theme/ThemeSwitcher";
import { breadcrumbFor } from "./nav-items";
import { CreditsChip } from "./CreditsChip";
import { UserMenu } from "./UserMenu";
import type { DashboardUser } from "./user";

export function DashboardTopbar({
  pathname,
  user,
  onLogout,
}: {
  pathname: string;
  user: DashboardUser | null;
  onLogout: () => void;
}) {
  const crumb = breadcrumbFor(pathname);
  return (
    <header className="flex h-16 items-center gap-3 border-b border-rr-border-muted bg-rr-card px-4 md:px-6">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
        <span className="text-rr-text-muted">Dashboard</span>
        {crumb !== "Dashboard" && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-rr-text-muted" aria-hidden />
            <span className="truncate font-medium text-rr-text">{crumb}</span>
          </>
        )}
      </nav>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <CreditsChip />
        <ThemeSwitcher />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
