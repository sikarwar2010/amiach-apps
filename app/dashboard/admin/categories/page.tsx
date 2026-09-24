import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AdminCategories } from "@/components/dashboard/AdminViews";

export const metadata: Metadata = { title: "Categories", robots: { index: false } };

export default function Page() {
  return (
    <DashboardShell role="admin" title="Categories" subtitle="Create categories, subcategories and listing attributes.">
      <AdminCategories />
    </DashboardShell>
  );
}
