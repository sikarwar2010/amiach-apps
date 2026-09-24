import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminOverview } from "@/components/dashboard/AdminViews";

export const metadata: Metadata = { title: "Admin Console", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="admin" title="Admin console" subtitle="Verification queue and marketplace health.">
      <AdminOverview />
    </DashboardShell>
  );
}
