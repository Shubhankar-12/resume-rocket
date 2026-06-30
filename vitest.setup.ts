import "@testing-library/jest-dom/vitest";

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
  // @ts-expect-error assigning a minimal mock for the test environment
  globalThis.IntersectionObserver = IntersectionObserverMock;
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
