import {
  BarChart3,
  CreditCard,
  FileText,
  Github,
  Home,
  Kanban,
  Mail,
  Settings,
  Upload,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Cover Letters", href: "/dashboard/cover-letters", icon: Mail },
  { name: "Tracker", href: "/dashboard/tracker", icon: Kanban },
  { name: "GitHub", href: "/dashboard/github", icon: Github },
  { name: "Upload", href: "/dashboard/upload", icon: Upload },
  { name: "Billing", href: "/dashboard/billing/credits", icon: CreditCard },
  { name: "AI Analytics", href: "/dashboard/ai-analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

const BREADCRUMB_MAP: { prefix: string; label: string }[] = [
  { prefix: "/dashboard/resumes", label: "My Resumes" },
  { prefix: "/dashboard/cover-letters", label: "Cover Letters" },
  { prefix: "/dashboard/tracker", label: "Tracker" },
  { prefix: "/dashboard/github", label: "GitHub" },
  { prefix: "/dashboard/upload", label: "Upload" },
  { prefix: "/dashboard/billing", label: "Billing" },
  { prefix: "/dashboard/ai-analytics", label: "AI Analytics" },
  { prefix: "/dashboard/settings", label: "Settings" },
  { prefix: "/dashboard/grader", label: "Grader" },
  { prefix: "/dashboard/tailored-resume", label: "Tailored Resume" },
  { prefix: "/dashboard/job-description", label: "Job Description" },
];

export function breadcrumbFor(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  const match = BREADCRUMB_MAP.find((m) => pathname.startsWith(m.prefix));
  if (match) return match.label;
  const seg = pathname.split("/").filter(Boolean).pop() ?? "Dashboard";
  return seg.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}
