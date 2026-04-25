import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Landing from "@/components/landing";

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
  return <Landing isLoggedIn={loggedIn} />;
}
