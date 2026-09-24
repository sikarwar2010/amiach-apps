import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VendorListingsView } from "@/components/dashboard/VendorViews";

export const metadata: Metadata = { title: "My Listings", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="vendor" title="My listings" subtitle="Track status, views and enquiries for every lot.">
      <VendorListingsView />
    </DashboardShell>
  );
}
