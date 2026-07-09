import type React from "react";
import RequireAuth from "@/components/RequireAuth";
import { OutOfCreditsProvider } from "@/contexts/OutOfCreditsContext";
import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <OutOfCreditsProvider>
        <DashboardShell>{children}</DashboardShell>
      </OutOfCreditsProvider>
    </RequireAuth>
  );
}
