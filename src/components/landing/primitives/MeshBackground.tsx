import * as React from "react";
import { cn } from "@/lib/utils";

export function MeshBackground({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...rest}
    >
      <div
        className="absolute inset-0 opacity-70 animate-mesh-drift"
        style={{
          backgroundImage:
            "radial-gradient(40% 50% at 20% 20%, hsl(var(--brand-300) / 0.45), transparent 70%)," +
            "radial-gradient(35% 45% at 80% 15%, hsl(var(--info) / 0.30), transparent 70%)," +
            "radial-gradient(45% 55% at 60% 85%, hsl(var(--brand-400) / 0.35), transparent 70%)",
        }}
      />
    </div>
  );
}
