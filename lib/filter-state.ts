import type { ConditionType, DealType, MaterialListing, MaterialUnit } from "./types";

export interface MarketplaceFilters {
  categories: string[];
  conditions: ConditionType[];
  dealTypes: DealType[];
  locations: string[];
  units: MaterialUnit[];
  priceMin: number;
  priceMax: number;
}

export const defaultFilters: MarketplaceFilters = {
  categories: [],
  conditions: [],
  dealTypes: [],
  locations: [],
  units: [],
  priceMin: 0,
  priceMax: 2500000,
};

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function applyFilters(
  listings: MaterialListing[],
  filters: MarketplaceFilters
): MaterialListing[] {
  return listings.filter((l) => {
    if (filters.categories.length && !filters.categories.includes(l.categoryId)) return false;
    if (filters.conditions.length && !filters.conditions.includes(l.condition)) return false;
    if (filters.dealTypes.length && !filters.dealTypes.includes(l.dealType)) return false;
    if (filters.locations.length && !filters.locations.includes(l.locationId)) return false;
    if (filters.units.length && !filters.units.includes(l.unit)) return false;
    if (l.price < filters.priceMin || l.price > filters.priceMax) return false;
    return true;
  });
}

export function activeFilterCount(filters: MarketplaceFilters): number {
  return (
    filters.categories.length +
    filters.conditions.length +
    filters.dealTypes.length +
    filters.locations.length +
    filters.units.length +
    (filters.priceMin > defaultFilters.priceMin || filters.priceMax < defaultFilters.priceMax ? 1 : 0)
  );
}
