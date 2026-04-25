declare global {
  interface Window {
    Razorpay?: new (options: unknown) => { open: () => void };
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let scriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay Checkout can only load in the browser"));
  }
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => {
          scriptPromise = null;
          reject(new Error("Razorpay script failed to load"));
        },
        { once: true }
      );
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Razorpay script failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface RazorpayCheckoutOptions {
  key: string; // razorpayKeyId
  orderId: string; // razorpayOrderId
  amount: number; // paise
  currency: "INR";
  name: string; // always "ResumeRocket"
  description: string; // e.g. "10 credits"
  onSuccess: (r: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  onDismiss: () => void;
}

export async function openRazorpayCheckout(opts: RazorpayCheckoutOptions): Promise<void> {
  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error("Razorpay Checkout SDK unavailable after load");
  }
  const rzp = new window.Razorpay({
    key: opts.key,
    order_id: opts.orderId,
    amount: opts.amount,
    currency: opts.currency,
    name: opts.name,
    description: opts.description,
    handler: opts.onSuccess,
    modal: { ondismiss: opts.onDismiss },
  });
  rzp.open();
}
