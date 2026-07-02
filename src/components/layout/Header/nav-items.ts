/** Primary navigation targets — section anchors on the landing page. */
export const NAV_ITEMS = [
  { href: "#features", id: "features", label: "Features" },
  { href: "#how", id: "how", label: "How It Works" },
  { href: "#pricing", id: "pricing", label: "Pricing" },
  { href: "#faq", id: "faq", label: "FAQ" },
] as const;

export const NAV_SECTION_IDS = NAV_ITEMS.map((n) => n.id);
