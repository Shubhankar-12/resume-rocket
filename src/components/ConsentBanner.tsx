"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { setConsent, hasDecidedConsent } from "@/lib/analytics/consent";
import { captureEvent, initAnalytics } from "@/lib/analytics/posthog";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasDecidedConsent());
    const onReopen = () => setVisible(true);
    window.addEventListener("rr:open-consent", onReopen);
    return () => window.removeEventListener("rr:open-consent", onReopen);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent("accepted");
    captureEvent("consent_given", {});
    initAnalytics();
    setVisible(false);
  };

  const decline = () => {
    setConsent("declined");
    captureEvent("consent_declined", {});
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur md:p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies to understand how you use ResumeRocket. You can decline without losing any
          features.
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
