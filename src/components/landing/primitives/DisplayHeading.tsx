import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

export function DisplayHeading({
  as: As = "h2",
  id,
  gradient = true,
  children,
  className,
}: {
  as?: ElementType;
  id?: string;
  gradient?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <As
      id={id}
      className={cn("font-bold tracking-tight", gradient && "text-gradient-brand", className)}
    >
      {children}
    </As>
  );
}
