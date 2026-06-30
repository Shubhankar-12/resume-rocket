"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type FooterLink = { label: string; href?: string; soon?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Contact", href: "mailto:hi@resumerocket.app" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", soon: true },
      { label: "Blog", soon: true },
      { label: "Changelog", soon: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
      { label: "Cookies" }, // reopens consent
    ],
  },
  {
    title: "Social",
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Email", href: "mailto:hi@resumerocket.app" },
    ],
  },
];

const SOCIAL_ICON: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

function reopenConsent() {
  window.dispatchEvent(new CustomEvent("rr:open-consent"));
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rr-border bg-rr-bg-elevated">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-6 md:px-8">
        <div className="md:col-span-1">
          <p className="text-base font-semibold text-rr-text">ResumeRocket</p>
          <p className="mt-2 text-xs text-rr-text-muted">AI Career Platform</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-rr-text-muted">
              {col.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => {
                const Icon = col.title === "Social" ? SOCIAL_ICON[l.label] : undefined;
                if (l.soon) {
                  return (
                    <li key={l.label} className="flex items-center gap-1.5 text-rr-text-muted">
                      {l.label}
                      <span className="rounded bg-rr-accent-light px-1.5 py-0.5 text-[9px] font-medium text-rr-accent">
                        Coming Soon
                      </span>
                    </li>
                  );
                }
                if (!l.href) {
                  return (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={reopenConsent}
                        className="text-rr-text-secondary transition-colors hover:text-rr-text"
                      >
                        {l.label}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-1.5 text-rr-text-secondary transition-colors hover:text-rr-text"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-rr-border">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-rr-text-muted md:flex-row md:px-8">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              disabled
              className="rounded-md border border-rr-border px-2 py-1 text-rr-text-muted"
              aria-label="Language (English)"
            >
              English
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span>© {year} ResumeRocket</span>
            <span>Version 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
