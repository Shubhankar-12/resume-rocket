import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MeshBackground } from "./MeshBackground";

type SectionVariant = "default" | "tinted" | "muted" | "dark";

const VARIANT: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  tinted: "bg-brand-50 text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-brand-950 text-white dark:bg-surface dark:text-foreground",
};

export interface SectionProps {
  id: string;
  labelledBy: string;
  variant?: SectionVariant;
  mesh?: boolean;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function Section({
  id,
  labelledBy,
  variant = "default",
  mesh = false,
  children,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative w-full overflow-hidden", VARIANT[variant], className)}
    >
      {mesh ? <MeshBackground data-mesh-slot /> : null}
      <div
        className={cn(
          "relative z-[1] mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
