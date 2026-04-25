import posthog from "posthog-js";
import { getConsent } from "./consent";
import type { EventName, EventProps } from "./events";

const DEFAULT_HOST = "https://us.i.posthog.com";

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || DEFAULT_HOST,
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: { password: true, email: false },
    },
    sample_rate: 1,
    session_recording_sample_rate: 0.5,
    loaded: (instance) => {
      instance.opt_in_capturing();
    },
  });
}

export function captureEvent<E extends EventName>(name: E, props: EventProps<E>): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (!(posthog as unknown as { __loaded?: boolean }).__loaded) return;
  posthog.capture(name, props as Record<string, unknown>);
}

export function identifyUser(userId: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (!(posthog as unknown as { __loaded?: boolean }).__loaded) return;
  posthog.identify(userId, props);
}

export function resetAnalytics(): void {
  if (typeof window === "undefined") return;
  if (!(posthog as unknown as { __loaded?: boolean }).__loaded) return;
  posthog.reset();
}
