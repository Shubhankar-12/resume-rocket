import * as React from "react";
import { cn } from "@/lib/utils";

export const GlassPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { strong?: boolean }
>(({ className, strong = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl", strong ? "glass glass-strong" : "glass", className)}
    {...props}
  />
));
GlassPanel.displayName = "GlassPanel";
