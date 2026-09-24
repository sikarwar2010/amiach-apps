import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VendorOverview } from "@/components/dashboard/VendorViews";

export const metadata: Metadata = { title: "Vendor Dashboard", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="vendor" title="Vendor dashboard" subtitle="Manage your surplus listings, enquiries and verification.">
      <VendorOverview />
    </DashboardShell>
  );
}
