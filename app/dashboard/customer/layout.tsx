import { Footer } from "@/components/layout/Footer";
import { requireRole } from "@/lib/auth/server";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  await requireRole("customer");
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
