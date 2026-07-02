"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A center-nav item. Hover reveals a hairline underline that slides in from the
 * left; the active section gets a solid indicator that glides between items
 * (shared layoutId), Linear-style.
 */
export function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group relative inline-flex h-9 items-center rounded-md px-3 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent",
        active ? "text-rr-text" : "text-rr-text-secondary hover:text-rr-text"
      )}
    >
      {label}
      {/* hover underline */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left rounded-full bg-rr-text/30 transition-transform duration-200",
          active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
      {/* active indicator that slides between items */}
      {active && (
        <motion.span
          layoutId="nav-active-underline"
          aria-hidden
          className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-rr-accent"
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
    </a>
  );
}
