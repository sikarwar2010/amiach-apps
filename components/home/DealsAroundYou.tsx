"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { listings, locations } from "@/lib/mock-data";
import { MaterialCard } from "@/components/cards/MaterialCard";
import { cn } from "@/lib/utils";

export function DealsAroundYou() {
  const topLocations = [...locations].sort((a, b) => b.listingCount - a.listingCount).slice(0, 6);
  const [selected, setSelected] = useState<string | null>(null);

  const shown = useMemo(() => {
    const filtered = selected ? listings.filter((l) => l.locationId === selected) : listings;
    return filtered.slice(0, 4);
  }, [selected]);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Deals Around You
            </h2>
            <p className="mt-2 max-w-xl text-ink-500">
              Discover surplus materials available near your location.
            </p>
          </div>
          <Link
            href="/deals"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex"
          >
            View all deals <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelected(null)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              !selected
                ? "border-brand-700 bg-brand-800 text-white"
                : "border-ink-200 text-ink-600 hover:border-brand-300 hover:bg-brand-50"
            )}
          >
            <MapPin size={14} /> All Locations
          </button>
          {topLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                selected === loc.id
                  ? "border-brand-700 bg-brand-800 text-white"
                  : "border-ink-200 text-ink-600 hover:border-brand-300 hover:bg-brand-50"
              )}
            >
              {loc.city}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((listing) => (
            <MaterialCard key={listing.id} listing={listing} />
          ))}
        </div>

        {shown.length === 0 && (
          <div className="mt-6 rounded-3xl border border-dashed border-ink-200 py-16 text-center text-sm text-ink-500">
            No active deals in this location yet.{" "}
            <Link href="/post-requirement" className="font-semibold text-brand-700 hover:text-brand-800">
              Post a requirement
            </Link>{" "}
            and we&apos;ll help you source it.
          </div>
        )}

        <Link
          href={selected ? `/deals/${selected}` : "/deals"}
          className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-brand-700 sm:hidden"
        >
          View all deals <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
