import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminAccounts } from "@/components/dashboard/AdminViews";

export const metadata: Metadata = { title: "Accounts", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="admin" title="Accounts" subtitle="Review and verify vendors and business buyers.">
      <AdminAccounts />
    </DashboardShell>
  );
}
