import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const existing = req.cookies.get("preferredCurrency");
  if (existing) return NextResponse.next();

  // Vercel exposes geo in request.geo at the edge, and also via x-vercel-ip-country header.
  // Use `any` to accommodate both Vercel and non-Vercel runtimes during local dev.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const country = (req as any).geo?.country ?? req.headers.get("x-vercel-ip-country");
  const currency = country === "IN" ? "INR" : "USD";

  const res = NextResponse.next();
  res.cookies.set("preferredCurrency", currency, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false, // readable by client for currency toggle
  });
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
