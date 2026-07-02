"use client";

import { LayoutGroup } from "framer-motion";
import { NavLink } from "./NavLink";
import { NAV_ITEMS, NAV_SECTION_IDS } from "./nav-items";
import { useActiveSection } from "./useActiveSection";

export function DesktopNav() {
  const active = useActiveSection([...NAV_SECTION_IDS]);
  return (
    <nav aria-label="Primary" className="hidden items-center justify-center gap-1 md:flex">
      <LayoutGroup>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={active === item.id}
          />
        ))}
      </LayoutGroup>
    </nav>
  );
}
