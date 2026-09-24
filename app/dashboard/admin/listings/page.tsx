import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminListings } from "@/components/dashboard/AdminViews";

export const metadata: Metadata = { title: "Listing Moderation", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="admin" title="Listings" subtitle="Moderate new supplier submissions.">
      <AdminListings />
    </DashboardShell>
  );
}
