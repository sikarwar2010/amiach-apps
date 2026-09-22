"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { categories, locations, trendingMaterials } from "@/lib/mock-data";

const recentSearches = [
  "Marble tiles Gurugram",
  "BWP plywood sheets",
  "Modular furniture Mumbai",
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
  const router = useRouter();

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

  const runSearch = (term: string) => {
    router.push(`/materials?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 pb-10 pt-24 sm:pt-28">
      <button
        aria-label="Close search"
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-3xl animate-scale-in rounded-3xl bg-white shadow-soft-xl ring-1 ring-inset ring-ink-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) runSearch(query.trim());
          }}
          className="flex items-center gap-3 border-b border-ink-100 px-5 py-4 sm:px-6"
        >
          <Search size={20} className="shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="What are you looking for? e.g. marble tiles, plywood, sanitaryware..."
            className="w-full bg-transparent text-base text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <X size={17} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2 border-b border-ink-100 px-5 py-3 sm:px-6">
          {[
            { icon: Tag, label: "Category" },
            { icon: MapPin, label: "Location" },
            { icon: Package, label: "Material" },
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
                  onClick={() => runSearch(s)}
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
                  onClick={() => {
                    router.push(`/materials/${c.slug}`);
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-xl border border-ink-100 px-3 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  {c.name}
                  <span className="text-xs text-ink-400">{c.listingCount.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <Flame size={13} className="text-accent-500" /> Trending Materials
            </h3>
            <div className="flex flex-col divide-y divide-ink-100">
              {trendingMaterials.map((s) => (
                <button
                  key={s}
                  onClick={() => runSearch(s)}
                  className="flex items-center justify-between py-2.5 text-left text-sm text-ink-700 hover:text-brand-700"
                >
                  {s}
                  <span className="text-xs text-ink-400">→</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <MapPin size={13} /> Popular Locations
            </h3>
            <div className="flex flex-wrap gap-2">
              {locations.slice(0, 6).map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    router.push(`/materials?location=${l.id}`);
                    onClose();
                  }}
                  className="rounded-full border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {l.city}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
