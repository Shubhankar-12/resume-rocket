import { useCallback, useEffect, useRef } from "react";

export function useInViewOnce(
  onEnter: () => void,
  eventKey: string,
  threshold = 0.3
): (node: Element | null) => void {
  const firedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const storageKey = `inview:${eventKey}`;

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(storageKey) === "1") {
      firedRef.current = true;
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [storageKey]);

  return useCallback(
    (node) => {
      if (!node) return;
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !firedRef.current) {
              firedRef.current = true;
              try {
                sessionStorage.setItem(storageKey, "1");
              } catch {
                // sessionStorage may be unavailable; safe to ignore
              }
              onEnter();
              observerRef.current?.disconnect();
            }
          }
        },
        { threshold }
      );
      observerRef.current.observe(node);
    },
    [onEnter, storageKey, threshold]
  );
}
