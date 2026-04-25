import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInViewOnce } from "../useInViewOnce";

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let observerCallback: IntersectionObserverCallback | null = null;

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  observerCallback = null;
  sessionStorage.clear();
  global.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      observerCallback = cb;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
    takeRecords = vi.fn(() => []);
    root = null;
    rootMargin = "";
    thresholds = [] as number[];
  } as unknown as typeof IntersectionObserver;
});

describe("useInViewOnce", () => {
  it("fires callback when element enters viewport", () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useInViewOnce(onEnter, "evt:test1"));
    const el = document.createElement("div");
    act(() => {
      result.current(el);
    });
    expect(mockObserve).toHaveBeenCalledWith(el);
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it("does not refire on second intersection", () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() => useInViewOnce(onEnter, "evt:test2"));
    const el = document.createElement("div");
    act(() => {
      result.current(el);
    });
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
      observerCallback?.(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it("respects sessionStorage flag (no fire if already seen)", () => {
    sessionStorage.setItem("inview:evt:test3", "1");
    const onEnter = vi.fn();
    const { result } = renderHook(() => useInViewOnce(onEnter, "evt:test3"));
    const el = document.createElement("div");
    act(() => {
      result.current(el);
    });
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(onEnter).not.toHaveBeenCalled();
  });
});
