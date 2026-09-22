"use client";

import { categories, locations } from "@/lib/mock-data";
import { conditionLabels, lotSizeLabels, saleFormatLabels } from "@/lib/labels";
import type { MarketplaceFilters } from "@/lib/filter-state";
import { toggleValue } from "@/lib/filter-state";
import { AccordionSection, CheckboxRow } from "@/components/ui/Accordion";
import { formatCurrency } from "@/lib/utils";
import type { ListingCondition, SaleFormat, InventoryLot } from "@/lib/types";

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: MarketplaceFilters;
  onChange: (filters: MarketplaceFilters) => void;
}) {
  return (
    <div>
      <AccordionSection title="Category" count={filters.categories.length}>
        <div className="flex flex-col">
          {categories.map((c) => (
            <CheckboxRow
              key={c.id}
              label={c.name}
              suffix={c.listingCount}
              checked={filters.categories.includes(c.id)}
              onChange={() =>
                onChange({ ...filters, categories: toggleValue(filters.categories, c.id) })
              }
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Sale Format" count={filters.saleFormats.length}>
        <div className="flex flex-col">
          {(Object.keys(saleFormatLabels) as SaleFormat[]).map((f) => (
            <CheckboxRow
              key={f}
              label={saleFormatLabels[f]}
              checked={filters.saleFormats.includes(f)}
              onChange={() =>
                onChange({ ...filters, saleFormats: toggleValue(filters.saleFormats, f) })
              }
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Condition" count={filters.conditions.length}>
        <div className="flex flex-col">
          {(Object.keys(conditionLabels) as ListingCondition[]).map((c) => (
            <CheckboxRow
              key={c}
              label={conditionLabels[c]}
              checked={filters.conditions.includes(c)}
              onChange={() =>
                onChange({ ...filters, conditions: toggleValue(filters.conditions, c) })
              }
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-ink-400">Min</label>
            <input
              type="number"
              value={filters.priceMin}
              min={0}
              onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) || 0 })}
              className="mt-1 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>
          <span className="mt-4 text-ink-300">—</span>
          <div className="flex-1">
            <label className="text-xs text-ink-400">Max</label>
            <input
              type="number"
              value={filters.priceMax}
              min={0}
              onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) || 0 })}
              className="mt-1 w-full rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-400">
          {formatCurrency(filters.priceMin)} – {formatCurrency(filters.priceMax)}
        </p>
      </AccordionSection>

      <AccordionSection title="Lot Size" count={filters.lotSizes.length}>
        <div className="flex flex-col">
          {(Object.keys(lotSizeLabels) as InventoryLot["lotSize"][]).map((size) => (
            <CheckboxRow
              key={size}
              label={lotSizeLabels[size]}
              checked={filters.lotSizes.includes(size)}
              onChange={() =>
                onChange({ ...filters, lotSizes: toggleValue(filters.lotSizes, size) })
              }
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Location" count={filters.locations.length} defaultOpen={false}>
        <div className="flex flex-col">
          {locations.map((l) => (
            <CheckboxRow
              key={l.id}
              label={`${l.city}, ${l.stateCode}`}
              checked={filters.locations.includes(l.id)}
              onChange={() =>
                onChange({ ...filters, locations: toggleValue(filters.locations, l.id) })
              }
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Shipping" defaultOpen={false}>
        <div className="flex flex-col">
          {["Freight", "LTL Freight", "Parcel", "Local Pickup"].map((s) => (
            <CheckboxRow key={s} label={s} checked={false} onChange={() => {}} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Date Added" defaultOpen={false}>
        <div className="flex flex-col">
          {["Last 24 hours", "Last 7 days", "Last 30 days", "All time"].map((s) => (
            <CheckboxRow key={s} label={s} checked={s === "All time"} onChange={() => {}} />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
