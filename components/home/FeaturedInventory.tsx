"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { InventoryCard } from "@/components/cards/InventoryCard";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "all", label: "All Deals" },
  { key: "auction", label: "Auctions" },
  { key: "buy-now", label: "Buy Now" },
  { key: "quote", label: "Bulk Quotes" },
] as const;

export function FeaturedInventory() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("all");

  const featured = listings.filter((l) => l.featured || l.wishlistCount);
  const filtered =
    active === "all" ? featured : featured.filter((l) => l.saleFormat === active);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Deals Worth Discovering
            </h2>
            <p className="mt-2 max-w-xl text-ink-500">
              Hand-picked lots with strong margins, verified sellers and clear
              manifests.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:inline-flex"
          >
            View full marketplace <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active === tab.key
                  ? "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 8).map((listing) => (
            <InventoryCard key={listing.id} listing={listing} />
          ))}
        </div>

        <Link
          href="/marketplace"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-brand-600 sm:hidden"
        >
          View full marketplace <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
