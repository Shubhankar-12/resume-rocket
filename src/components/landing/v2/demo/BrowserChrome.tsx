import { RotateCw, Star, Lock } from "lucide-react";

/** The window chrome: traffic lights and an address bar. */
export function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-rr-border-muted bg-rr-bg-elevated px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <RotateCw className="hidden h-3.5 w-3.5 text-rr-text-muted sm:block" aria-hidden />
      <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-md bg-rr-card px-3 py-1 text-[11px] text-rr-text-muted">
        <Lock className="h-3 w-3" aria-hidden />
        app.resumerocket.example/dashboard
      </div>
      <Star className="hidden h-3.5 w-3.5 text-rr-text-muted sm:block" aria-hidden />
    </div>
  );
}
