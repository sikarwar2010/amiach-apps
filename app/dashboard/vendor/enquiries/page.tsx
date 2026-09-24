import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VendorEnquiriesView } from "@/components/dashboard/VendorViews";

export const metadata: Metadata = { title: "Vendor Enquiries", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="vendor" title="Enquiries" subtitle="Quotes, bulk deals and buyer messages.">
      <VendorEnquiriesView />
    </DashboardShell>
  );
}
