import { OnboardingWrapper } from "./OnboardingWrapper";
import { DashboardHome } from "@/components/dashboard/home/DashboardHome";
import { StatsType } from "../types/DashboardTypes";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

const getDashboardData = async (): Promise<StatsType | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API}/api/v1/user/stats`, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    if (!res.ok) return null;
    const response = await res.json();

    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function Dashboard() {
  const dashboardData: StatsType | null = await getDashboardData();

  if (!dashboardData) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-rr-border-muted bg-rr-card p-6 text-center">
        <h2 className="font-display text-lg font-semibold text-rr-text">Something went wrong</h2>
        <p className="mt-1 text-sm text-rr-text-secondary">
          We couldn&apos;t load your dashboard. Please refresh, or try again in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OnboardingWrapper />
      <DashboardHome stats={dashboardData} />
    </div>
  );
}
