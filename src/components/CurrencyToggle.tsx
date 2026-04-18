"use client";
import { useCurrency } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="inline-flex rounded-lg border p-1">
      <Button
        variant={currency === "USD" ? "default" : "ghost"}
        size="sm"
        onClick={() => setCurrency("USD")}
        className="h-8"
      >
        USD
      </Button>
      <Button
        variant={currency === "INR" ? "default" : "ghost"}
        size="sm"
        onClick={() => setCurrency("INR")}
        className="h-8"
      >
        INR
      </Button>
    </div>
  );
}
