import { Rocket } from "lucide-react";
import { SIDEBAR_ITEMS, WORKSPACE } from "./hero-data";

/** The app navigation rail inside the browser preview. */
export function HeroSidebar() {
  return (
    <aside className="hidden h-full flex-col border-r border-rr-border-muted bg-rr-card p-3 lg:flex">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rr-accent text-white">
          <Rocket className="h-4 w-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-rr-text">ResumeRocket</p>
          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-rr-text-muted">
            {WORKSPACE.workspace}
          </p>
        </div>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-0.5">
        {SIDEBAR_ITEMS.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            data-active={active || undefined}
            className="group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-rr-text-muted transition-colors data-[active]:bg-rr-accent-light data-[active]:text-rr-accent hover:bg-rr-accent-light/60 hover:text-rr-text"
          >
            {active && (
              <span
                className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-rr-accent"
                aria-hidden
              />
            )}
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </span>
        ))}
      </nav>

      <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-rr-border-muted p-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rr-accent/10 text-xs font-semibold text-rr-accent">
          {WORKSPACE.initials}
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[13px] font-medium text-rr-text">{WORKSPACE.user}</p>
          <p className="text-[11px] text-rr-text-muted">{WORKSPACE.plan}</p>
        </div>
      </div>
    </aside>
  );
}
