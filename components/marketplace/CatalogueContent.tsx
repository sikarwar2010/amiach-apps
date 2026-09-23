"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, LayoutGrid, ChevronDown } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { applyFilters, defaultFilters, type MarketplaceFilters } from "@/lib/filter-state";
import { MaterialCard } from "@/components/cards/MaterialCard";
import { MaterialCardSkeleton } from "@/components/ui/Skeleton";
import { FilterSidebar } from "./FilterSidebar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { LocationChipRow } from "./LocationChipRow";
import { cn } from "@/lib/utils";

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "savings", label: "Savings" },
  { key: "newest", label: "Newest" },
] as const;

export function CatalogueContent({
  presetCategory,
  presetLocation,
  title = "Browse Materials",
  eyebrow = "Explore Materials",
  showLocationChips = false,
}: {
  presetCategory?: string;
  presetLocation?: string;
  title?: string;
  eyebrow?: string;
  showLocationChips?: boolean;
}) {
  const searchParams = useSearchParams();
  const initialCategory = presetCategory ?? searchParams.get("category");
  const initialLocation = presetLocation ?? searchParams.get("location");
  const initialFeatured = searchParams.get("featured") === "true";
  const initialQuery = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<MarketplaceFilters>({
    ...defaultFilters,
    categories: initialCategory ? [initialCategory] : [],
    locations: initialLocation ? [initialLocation] : [],
  });
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["key"]>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let result = applyFilters(listings, filters);
    if (initialFeatured) {
      result = result.filter((l) => l.featured);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.brand.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }
    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "newest")
      sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    if (sort === "savings")
      sorted.sort(
        (a, b) =>
          (b.marketValue - b.price) / b.marketValue - (a.marketValue - a.price) / a.marketValue
      );
    return sorted;
  }, [filters, query, sort, initialFeatured]);

  return (
    <main className="pt-28 sm:pt-32">
      <div className="container-page">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            {eyebrow}
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-ink-500">
            {filtered.length} active listings matching your criteria
          </p>
        </div>

        {showLocationChips && (
          <div className="mt-5">
            <LocationChipRow activeLocationId={presetLocation} />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3">
            <Search size={17} className="shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search this marketplace..."
              className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <div className="relative shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-full w-full appearance-none rounded-2xl border border-ink-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-ink-700 focus:border-brand-400 focus:outline-none sm:w-auto"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-8 pb-20">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <MaterialCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
                <LayoutGrid size={32} className="text-ink-300" />
                <h3 className="mt-4 text-lg font-bold text-ink-900">No listings match</h3>
                <p className="mt-1 max-w-sm text-sm text-ink-500">
                  Try adjusting or clearing your filters, or post a
                  requirement and let our sourcing network help.
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-5 rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((listing) => (
                  <MaterialCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />
    </main>
  );
}
