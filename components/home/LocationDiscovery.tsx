import Link from "next/link";
import { MapPin, Navigation, Search } from "lucide-react";
import { locations } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export function LocationDiscovery() {
  const sorted = [...locations].sort((a, b) => b.dealCount - a.dealCount);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="overflow-hidden rounded-4xl bg-ink-900 px-6 py-12 sm:px-10 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-inset ring-white/10">
                <Navigation size={13} />
                Location-Based Discovery
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Find Inventory Near You
              </h2>
              <p className="mt-3 max-w-md text-white/60">
                Reduce freight costs and lead times by sourcing from sellers
                closer to your resale market. Search by city, state, region or
                radius.
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white/10 p-1.5 ring-1 ring-inset ring-white/10">
                <Search size={17} className="ml-2 shrink-0 text-white/50" />
                <input
                  type="text"
                  placeholder="Enter city, state or zip code..."
                  className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-white/90">
                  Search
                </button>
              </div>

              <Link
                href="/marketplace"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
              >
                <MapPin size={14} /> Or browse all 62 cities
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
              {sorted.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/marketplace?location=${loc.id}`}
                  className="group flex flex-col justify-between rounded-2xl bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10 transition-all duration-200 hover:bg-white/[0.12]"
                >
                  <MapPin size={16} className="text-brand-300" />
                  <div className="mt-6">
                    <div className="text-sm font-bold text-white">{loc.city}</div>
                    <div className="text-xs text-white/50">{loc.stateCode}</div>
                    <div className="mt-2 text-xs font-semibold text-brand-300">
                      {formatNumber(loc.dealCount)} Deals
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
