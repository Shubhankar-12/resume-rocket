import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "lightTinted" | "lightGray" | "dark";

const VARIANT_BG: Record<Variant, string> = {
  light: "bg-white text-[hsl(var(--ink-700))] dark:bg-background dark:text-foreground",
  lightTinted:
    "bg-[hsl(var(--brand-50))] text-[hsl(var(--ink-700))] dark:bg-background dark:text-foreground",
  lightGray: "bg-slate-50 text-[hsl(var(--ink-700))] dark:bg-background dark:text-foreground",
  dark: "bg-[hsl(var(--ink-950))] text-white dark:bg-[hsl(var(--ink-900))]",
};

export interface SectionShellProps {
  id: string;
  labelledBy: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  labelledBy,
  variant = "light",
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(VARIANT_BG[variant], "w-full", className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">{children}</div>
    </section>
  );
}
