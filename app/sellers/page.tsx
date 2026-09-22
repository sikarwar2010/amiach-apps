import type { Metadata } from "next";
import { sellers } from "@/lib/mock-data";
import { SellerCard } from "@/components/cards/SellerCard";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Seller Directory",
  description: "Browse verified sellers of liquidation, surplus and wholesale inventory on Lotwise.",
};

export default function SellersPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Sellers
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Seller Directory
          </h1>
          <p className="mt-2 max-w-xl text-ink-500">
            {sellers.length} active sellers, reviewed and monitored for buyer
            protection.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
