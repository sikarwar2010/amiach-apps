// Core data architecture for the Lotwise marketplace.
// These types mirror what would come back from the API; mock-data.ts
// populates them for now so every UI is already shaped for real data.

export type ListingCondition =
  | "new"
  | "open-box"
  | "refurbished"
  | "grade-a"
  | "grade-b"
  | "grade-c"
  | "customer-returns"
  | "mixed";

export type SaleFormat = "auction" | "buy-now" | "quote";

export type ShippingMethod = "freight" | "ltl" | "parcel" | "local-pickup";

export interface Location {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  region: string;
  dealCount: number;
  lat?: number;
  lng?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  listingCount: number;
  imageUrl: string;
  description?: string;
  parentId?: string | null;
}

export interface Seller {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  verified: boolean;
  location: string;
  categories: string[];
  activeListings: number;
  activeUnits: number;
  responseRate: number; // 0-100
  rating: number; // 0-5
  reviewCount: number;
  memberSince: string; // ISO date
  description?: string;
}

export interface Bid {
  id: string;
  listingId: string;
  amount: number;
  bidderInitials: string;
  placedAt: string; // ISO datetime
}

export interface ManifestLine {
  sku: string;
  description: string;
  quantity: number;
  unitRetail: number;
  category: string;
}

export interface InventoryLot {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categoryId: string;
  subcategory?: string;
  condition: ListingCondition;
  images: string[];
  quantity: number;
  lotSize: "single-pallet" | "multi-pallet" | "truckload" | "case-pack" | "unit";
  locationId: string;
  sellerId: string;
  saleFormat: SaleFormat;
  retailValue: number;
  currentPrice: number; // current bid, or buy-now price, or starting quote price
  buyNowPrice?: number; // present when a buy-now option exists alongside auction
  bidCount?: number;
  bids?: Bid[];
  auctionEndsAt?: string; // ISO datetime, only for auctions
  shippingMethods: ShippingMethod[];
  description: string;
  conditionNotes?: string;
  manifest?: ManifestLine[];
  dateAdded: string; // ISO date
  featured?: boolean;
  wishlistCount?: number;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface MarketplaceStats {
  inventoryValue: number;
  activeLots: number;
  verifiedSellers: number;
  categories: number;
  cities: number;
}
