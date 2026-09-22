import type { Metadata } from "next";
import { suppliers } from "@/lib/mock-data";
import { SupplierCard } from "@/components/cards/SupplierCard";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Supplier Directory",
  description: "Browse verified suppliers of surplus, excess and overstock building & interior materials on MaalGodaam.com.",
};

export default function SuppliersPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Suppliers
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Supplier Directory
          </h1>
          <p className="mt-2 max-w-xl text-ink-500">
            {suppliers.length} active suppliers, reviewed before listing goes
            live.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
