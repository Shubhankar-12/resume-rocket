"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store/slices/hooks";
import { logout } from "@/lib/store/slices/authSlice";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { MobileNav } from "./MobileNav";
import type { DashboardUser } from "./user";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector((s) => s.auth.user) as DashboardUser | null;

  function handleLogout() {
    dispatch(logout());
    router.push("/auth");
  }

  return (
    <div className="flex h-screen bg-rr-bg text-rr-text">
      <DashboardSidebar
        pathname={pathname}
        user={user}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar pathname={pathname} user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 lg:pb-6">{children}</main>
      </div>
      <MobileNav pathname={pathname} />
    </div>
  );
}
