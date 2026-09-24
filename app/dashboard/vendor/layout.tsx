import { Footer } from "@/components/layout/Footer";
import { requireRole } from "@/lib/auth/server";

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  await requireRole("vendor");
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
