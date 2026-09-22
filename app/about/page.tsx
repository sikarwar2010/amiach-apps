import type { Metadata } from "next";
import Image from "next/image";
import { marketplaceStats } from "@/lib/mock-data";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import { TrustSection } from "@/components/home/TrustSection";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "About Lotwise" };

const stats = [
  { label: "Inventory Value", value: formatCurrency(marketplaceStats.inventoryValue) },
  { label: "Active Lots", value: `${formatCompactNumber(marketplaceStats.activeLots)}+` },
  { label: "Verified Sellers", value: `${marketplaceStats.verifiedSellers}+` },
];

export default function AboutPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <section className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                About Lotwise
              </span>
              <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
                Building the trusted marketplace for surplus inventory.
              </h1>
              <p className="mt-4 text-lg text-ink-500">
                Lotwise connects verified sellers of liquidation, overstock and
                returned inventory with resellers and retailers ready to move
                it back into the market — transparently and at scale.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-extrabold text-ink-900">{s.value}</div>
                    <div className="mt-1 text-xs text-ink-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-4xl shadow-soft-xl">
              <Image
                src="https://picsum.photos/seed/lw-about-warehouse/900/700"
                alt="Lotwise fulfillment warehouse"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
