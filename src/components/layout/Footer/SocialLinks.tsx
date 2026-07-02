import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "GitHub", href: "https://github.com/", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "Email", href: "mailto:hi@resumerocket.app", Icon: Mail },
];

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rr-border text-rr-text-secondary transition-all duration-200 hover:scale-105 hover:border-rr-accent/40 hover:text-rr-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rr-accent motion-reduce:hover:scale-100"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
