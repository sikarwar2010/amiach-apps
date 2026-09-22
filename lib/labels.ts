import type { ListingCondition, InventoryLot, ShippingMethod } from "./types";

export const conditionLabels: Record<ListingCondition, string> = {
  new: "New",
  "open-box": "Open Box",
  refurbished: "Refurbished",
  "grade-a": "Grade A",
  "grade-b": "Grade B",
  "grade-c": "Grade C",
  "customer-returns": "Customer Returns",
  mixed: "Mixed Condition",
};

export const lotSizeLabels: Record<InventoryLot["lotSize"], string> = {
  "single-pallet": "Single Pallet",
  "multi-pallet": "Multi-Pallet",
  truckload: "Truckload",
  "case-pack": "Case Pack",
  unit: "Unit Lot",
};

export const shippingLabels: Record<ShippingMethod, string> = {
  freight: "Freight",
  ltl: "LTL Freight",
  parcel: "Parcel",
  "local-pickup": "Local Pickup",
};

export const saleFormatLabels: Record<InventoryLot["saleFormat"], string> = {
  auction: "Auction",
  "buy-now": "Buy Now",
  quote: "Request Quote",
};
