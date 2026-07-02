"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The header's action buttons. `primary` is the solid Upload CTA (small
 * elevation on hover); `ghost` is the quiet Sign In. Sizes cover the compact
 * header and the larger mobile-overlay buttons.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "sm",
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "lg";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-rr-bg",
        size === "sm" ? "h-9 px-4 text-sm" : "h-12 w-full px-5 text-base",
        variant === "primary"
          ? "bg-rr-accent text-white shadow-[0_1px_2px_hsl(240_24%_10%/0.16)] hover:-translate-y-0.5 hover:bg-rr-accent-hover hover:shadow-[0_8px_20px_-8px_hsl(243_78%_60%/0.55)] motion-reduce:hover:translate-y-0"
          : "text-rr-text-secondary hover:bg-rr-bg-elevated hover:text-rr-text",
        className
      )}
    >
      {children}
    </Link>
  );
}
