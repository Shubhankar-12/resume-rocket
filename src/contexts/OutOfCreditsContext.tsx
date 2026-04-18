"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { subscribeOutOfCredits } from "@/lib/events/outOfCredits";
import { OutOfCreditsModal } from "@/components/OutOfCreditsModal";

interface Ctx {
  open: (creditsNeeded: number) => void;
}

const OutOfCreditsContext = createContext<Ctx | null>(null);

export function OutOfCreditsProvider({ children }: { children: ReactNode }) {
  const [needed, setNeeded] = useState<number | null>(null);

  const open = (n: number) => setNeeded(n);
  const close = () => setNeeded(null);

  useEffect(() => {
    return subscribeOutOfCredits((n) => setNeeded(n));
  }, []);

  return (
    <OutOfCreditsContext.Provider value={{ open }}>
      {children}
      <OutOfCreditsModal open={needed !== null} creditsNeeded={needed ?? 0} onClose={close} />
    </OutOfCreditsContext.Provider>
  );
}

export function useOutOfCredits(): Ctx {
  const ctx = useContext(OutOfCreditsContext);
  if (!ctx) throw new Error("useOutOfCredits must be used inside OutOfCreditsProvider");
  return ctx;
}
