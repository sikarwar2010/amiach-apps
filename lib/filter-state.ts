import type { InventoryLot, ListingCondition, SaleFormat } from "./types";

export interface MarketplaceFilters {
  categories: string[];
  conditions: ListingCondition[];
  saleFormats: SaleFormat[];
  locations: string[];
  lotSizes: InventoryLot["lotSize"][];
  priceMin: number;
  priceMax: number;
}

export const defaultFilters: MarketplaceFilters = {
  categories: [],
  conditions: [],
  saleFormats: [],
  locations: [],
  lotSizes: [],
  priceMin: 0,
  priceMax: 200000,
};

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function applyFilters(
  listings: InventoryLot[],
  filters: MarketplaceFilters
): InventoryLot[] {
  return listings.filter((l) => {
    if (filters.categories.length && !filters.categories.includes(l.categoryId)) return false;
    if (filters.conditions.length && !filters.conditions.includes(l.condition)) return false;
    if (filters.saleFormats.length && !filters.saleFormats.includes(l.saleFormat)) return false;
    if (filters.locations.length && !filters.locations.includes(l.locationId)) return false;
    if (filters.lotSizes.length && !filters.lotSizes.includes(l.lotSize)) return false;
    if (l.currentPrice < filters.priceMin || l.currentPrice > filters.priceMax) return false;
    return true;
  });
}

export function activeFilterCount(filters: MarketplaceFilters): number {
  return (
    filters.categories.length +
    filters.conditions.length +
    filters.saleFormats.length +
    filters.locations.length +
    filters.lotSizes.length +
    (filters.priceMin > defaultFilters.priceMin || filters.priceMax < defaultFilters.priceMax ? 1 : 0)
  );
}
