import Link from "next/link";
import { FooterColumn, type FooterLink } from "./FooterColumn";
import { SocialLinks } from "./SocialLinks";
import { FooterBottom } from "./FooterBottom";
import { ThemeSwitcher } from "../Theme/ThemeSwitcher";

const PRODUCT: FooterLink[] = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Roadmap", soon: true },
];

const RESOURCES: FooterLink[] = [
  { label: "Documentation", soon: true },
  { label: "Blog", soon: true },
  { label: "Release Notes", soon: true },
  { label: "Status", soon: true },
];

const COMPANY: FooterLink[] = [
  { label: "About", href: "/" },
  { label: "Contact", href: "/contact-us" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
];

const linkClass =
  "group/link relative inline-block text-sm text-rr-text-secondary transition-colors hover:text-rr-text rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent";

/**
 * Grounding footer on an elevated neutral surface. Five columns on desktop
 * (brand + four link groups), a two-column grid on tablet, and mobile
 * accordions — with the theme control and back-to-top always reachable in the
 * bottom bar. Composition over decoration: hairline dividers, no big gradients.
 */
export function Footer() {
  return (
    <footer className="border-t border-rr-border bg-rr-bg-elevated">
      <div className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-2 px-6 pb-6 pt-16 md:grid-cols-2 md:gap-y-12 md:px-8 md:pb-10 md:pt-20 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-x-10 lg:px-12">
        {/* brand */}
        <div className="pb-4 md:col-span-2 md:pb-0 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rr-accent text-[13px] font-bold text-white">
              R
            </span>
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-rr-text">
              ResumeRocket
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-rr-text-secondary">
            AI-powered career platform helping job seekers improve resumes, tailor applications,
            generate cover letters, and organize their job search.
          </p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>

        <FooterColumn title="Product" links={PRODUCT} />
        <FooterColumn title="Resources" links={RESOURCES} />
        <FooterColumn title="Company" links={COMPANY} />

        {/* account — links plus the theme control and a future locale note */}
        <div className="border-t border-rr-border/50 py-3 md:border-0 md:py-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-rr-text-muted">
            Account
          </p>
          <ul className="space-y-2.5 pt-4">
            <li>
              <Link href="/auth" className={linkClass}>
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/auth?next=/dashboard" className={linkClass}>
                Create Account
              </Link>
            </li>
          </ul>
          <div className="mt-5 flex flex-col items-start gap-2">
            <span className="text-xs font-medium text-rr-text-muted">Theme</span>
            <ThemeSwitcher />
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-rr-text-muted">
            Language
            <span className="rounded bg-rr-accent-light px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-rr-accent">
              Soon
            </span>
          </p>
        </div>
      </div>

      {/* <FooterBottom /> */}
    </footer>
  );
}
