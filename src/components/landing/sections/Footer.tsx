"use client";

import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Grader", href: "/dashboard/upload" },
      { label: "Cover letters", href: "/dashboard/cover-letters" },
      { label: "Plans", href: "/plans" },
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
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [{ label: "GitHub", href: "https://github.com/" }],
  },
];

function reopenConsent() {
  window.dispatchEvent(new CustomEvent("rr:open-consent"));
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-5 md:px-8">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">ResumeRocket</p>
          <p className="mt-2 text-sm text-muted-foreground">
            AI resume grading + tailoring for engineers.
          </p>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} ResumeRocket</p>
          <button
            type="button"
            onClick={reopenConsent}
            className="underline-offset-2 hover:underline"
          >
            Cookie preferences
          </button>
        </div>
      </div>
    </footer>
  );
}
