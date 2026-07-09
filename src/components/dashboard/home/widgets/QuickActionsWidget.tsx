"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Mail, Upload, Wand2, type LucideIcon } from "lucide-react";
import { WidgetCard } from "@/components/rr";

interface Action {
  label: string;
  href: string;
  icon: LucideIcon;
}

export function QuickActionsWidget({
  provider,
  className,
}: {
  provider?: string;
  className?: string;
}) {
  const actions: Action[] = [
    { label: "Upload resume", href: "/dashboard/upload", icon: Upload },
    { label: "Tailor resume", href: "/dashboard/resumes", icon: Wand2 },
    { label: "Cover letter", href: "/dashboard/cover-letters/new", icon: Mail },
  ];
  if (provider !== "github") {
    actions.push({ label: "Connect GitHub", href: "/dashboard/github", icon: Github });
  }

  return (
    <WidgetCard title="Quick Actions" className={className}>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rr-border-muted bg-rr-card px-3 py-2 text-[13px] font-medium text-rr-text-secondary transition-colors hover:border-rr-accent/40 hover:bg-rr-accent-light hover:text-rr-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent"
          >
            <a.icon className="h-3.5 w-3.5" aria-hidden />
            {a.label}
            <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
          </Link>
        ))}
      </div>
    </WidgetCard>
  );
}
