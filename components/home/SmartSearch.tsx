"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Flame,
  MapPin,
  Package,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { categories, popularSearches, trendingSearches } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const recentSearches = [
  "Electronics pallets Dallas",
  "Grade A smartphones",
  "Apparel truckload",
];

export function SmartSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 pb-10 pt-24 sm:pt-28">
      <button
        aria-label="Close search"
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-3xl animate-scale-in rounded-3xl bg-white shadow-soft-xl ring-1 ring-inset ring-ink-100">
        <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-4 sm:px-6">
          <Search size={20} className="shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search products, brands, categories or locations..."
            className="w-full bg-transparent text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-ink-100 px-5 py-3 sm:px-6">
          {[
            { icon: Tag, label: "Category" },
            { icon: MapPin, label: "Location" },
            { icon: Package, label: "Quantity" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-5 sm:px-6">
          <section className="mb-6">
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <Clock size={13} /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <Sparkles size={13} /> Popular Categories
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {categories.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  className="flex items-center justify-between rounded-xl border border-ink-100 px-3 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {c.name}
                  <span className="text-xs text-ink-400">{c.listingCount.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <Flame size={13} className="text-urgent-500" /> Trending Now
            </h3>
            <div className="flex flex-col divide-y divide-ink-100">
              {trendingSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className={cn(
                    "flex items-center justify-between py-2.5 text-left text-sm text-ink-700 hover:text-brand-700"
                  )}
                >
                  {s}
                  <span className="text-xs text-ink-400">→</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
