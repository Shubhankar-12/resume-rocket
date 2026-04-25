import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EyebrowLabel({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "muted";
}) {
  return (
    <span
      className={cn(
        "text-xs font-medium uppercase tracking-widest",
        tone === "brand" ? "text-[hsl(var(--brand-600))]" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
