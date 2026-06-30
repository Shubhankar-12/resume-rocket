import type { Metadata } from "next";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Landing from "@/components/landing";
import { buildSoftwareAppLd, buildFaqLd, LANDING_DESCRIPTION } from "@/components/landing/v2/seo";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://resumerocket.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ResumeRocket — AI Resume Analysis, Tailoring & Job Application Tracking",
  description: LANDING_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "ResumeRocket — Build Stronger Job Applications With AI",
    description: LANDING_DESCRIPTION,
    images: [
      { url: "/dashboard.png", width: 1200, height: 630, alt: "ResumeRocket dashboard preview" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeRocket — Build Stronger Job Applications With AI",
    description: LANDING_DESCRIPTION,
    images: ["/dashboard.png"],
  },
};

async function checkLoggedIn() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;
    const decodedToken: { user?: { id?: string } } | null = jwt.decode(token) as {
      user?: { id?: string };
    } | null;
    if (!decodedToken?.user?.id) return false;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/api/v1/user?user_id=${decodedToken.user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return false;
    const response = await res.json();
    return Boolean(response.body);
  } catch {
    return false;
  }
}

function MaintenanceFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-semibold">We&apos;re updating ResumeRocket.</h1>
        <p className="mt-3 text-muted-foreground">Back in a few minutes.</p>
      </div>
    </main>
  );
}

export default async function Page() {
  if (process.env.NEXT_PUBLIC_LANDING_VARIANT === "v1") {
    return <MaintenanceFallback />;
  }
  const loggedIn = await checkLoggedIn();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareAppLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqLd()) }}
      />
      <Landing isLoggedIn={loggedIn} />
    </>
  );
}
