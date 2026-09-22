"use client";

import { useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { MarketplaceFilters } from "@/lib/filter-state";
import { activeFilterCount, defaultFilters } from "@/lib/filter-state";
import { FilterPanel } from "./FilterPanel";
import { Button } from "@/components/ui/Button";

export function MobileFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: MarketplaceFilters;
  onChange: (filters: MarketplaceFilters) => void;
  resultCount: number;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  const count = activeFilterCount(filters);

  return (
    <div className="fixed inset-0 z-[95] flex items-end lg:hidden">
      <button
        aria-label="Close filters"
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-4xl bg-white shadow-soft-xl animate-fade-up">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <span className="flex items-center gap-2 text-base font-bold text-ink-900">
            <SlidersHorizontal size={17} /> Filters
          </span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <FilterPanel filters={filters} onChange={onChange} />
        </div>
        <div className="flex items-center gap-2.5 border-t border-ink-100 px-5 py-4">
          {count > 0 && (
            <button
              onClick={() => onChange(defaultFilters)}
              className="shrink-0 text-sm font-semibold text-ink-500"
            >
              Clear all
            </button>
          )}
          <Button onClick={onClose} className="w-full">
            Show {resultCount} Results
          </Button>
        </div>
      </div>
    </div>
  );
}
