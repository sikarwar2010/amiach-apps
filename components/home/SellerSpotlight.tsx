import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sellers } from "@/lib/mock-data";
import { SellerCard } from "@/components/cards/SellerCard";

export function SellerSpotlight() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Trusted Sellers
            </h2>
            <p className="mt-2 max-w-xl text-ink-500">
              Every seller is vetted for authenticity, fulfillment reliability
              and manifest accuracy.
            </p>
          </div>
          <Link
            href="/sellers"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:inline-flex"
          >
            View seller directory <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sellers.slice(0, 3).map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>

        <Link
          href="/sellers"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-brand-600 sm:hidden"
        >
          View seller directory <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
