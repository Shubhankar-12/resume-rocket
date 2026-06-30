import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-eyebrow uppercase",
        tone === "brand" ? "text-brand-600" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
