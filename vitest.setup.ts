import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// @testing-library/react's `waitFor`/asyncWrapper only recognizes fake timers
// via a `typeof jest !== "undefined"` check (see @testing-library/dom's
// jestFakeTimersAreEnabled helper). Under Vitest there is no `jest` global, so
// without this shim any test combining `vi.useFakeTimers()` with `waitFor`
// hangs forever waiting on an unadvanceable internal `setTimeout(0)`.
if (typeof (globalThis as { jest?: unknown }).jest === "undefined") {
  (globalThis as unknown as { jest: { advanceTimersByTime: typeof vi.advanceTimersByTime } }).jest =
    {
      advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms),
    };
}

// jsdom lacks IntersectionObserver, which framer-motion's whileInView relies on.
class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (!("IntersectionObserver" in globalThis)) {
  globalThis.IntersectionObserver =
    IntersectionObserverMock as unknown as typeof IntersectionObserver;
}

// jsdom lacks matchMedia, used by next-themes and useReducedMotion.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
