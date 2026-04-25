import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

export function GradientHeading({
  as: As = "h2",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <As
      id={id}
      className={cn(
        "bg-gradient-to-br from-[hsl(var(--brand-600))] to-[hsl(var(--brand-400))] bg-clip-text text-transparent",
        "font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </As>
  );
}
