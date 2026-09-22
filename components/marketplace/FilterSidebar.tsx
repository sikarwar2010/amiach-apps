"use client";

import { SlidersHorizontal, X } from "lucide-react";
import type { MarketplaceFilters } from "@/lib/filter-state";
import { activeFilterCount, defaultFilters } from "@/lib/filter-state";
import { FilterPanel } from "./FilterPanel";

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: MarketplaceFilters;
  onChange: (filters: MarketplaceFilters) => void;
}) {
  const count = activeFilterCount(filters);

  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-ink-100 bg-white p-5 shadow-soft-sm">
        <div className="flex items-center justify-between pb-4">
          <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
            <SlidersHorizontal size={16} /> Filters
          </span>
          {count > 0 && (
            <button
              onClick={() => onChange(defaultFilters)}
              className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>
        <FilterPanel filters={filters} onChange={onChange} />
      </div>
    </aside>
  );
}
