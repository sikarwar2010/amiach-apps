import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CustomerOverview } from "@/components/dashboard/CustomerOverview";

export const metadata: Metadata = { title: "Customer Dashboard", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="customer" title="Customer dashboard" subtitle="Your requirements, enquiries and recommended deals.">
      <CustomerOverview />
    </DashboardShell>
  );
}
