import type { ConditionType, DealType, MaterialUnit, LogisticsMethod } from "./types";

export const conditionLabels: Record<ConditionType, string> = {
  surplus: "Surplus",
  overstock: "Overstock",
  excess: "Excess Inventory",
  discontinued: "Discontinued",
  clearance: "Clearance",
  "customer-return": "Customer Return",
  "display-stock": "Display Stock",
  "factory-stock": "Factory Stock",
};

export const conditionTone: Record<ConditionType, "neutral" | "brand" | "accent"> = {
  surplus: "brand",
  overstock: "neutral",
  excess: "neutral",
  discontinued: "accent",
  clearance: "accent",
  "customer-return": "neutral",
  "display-stock": "neutral",
  "factory-stock": "brand",
};

export const dealTypeLabels: Record<DealType, string> = {
  "buy-now": "Buy Now",
  "request-quote": "Request Quote",
  "bulk-deal": "Bulk Deal",
  "contact-supplier": "Contact Supplier",
};

export const unitLabels: Record<MaterialUnit, string> = {
  "sq-ft": "sq.ft",
  piece: "pieces",
  box: "boxes",
  set: "sets",
  "running-ft": "running ft",
  sheet: "sheets",
  roll: "rolls",
  unit: "units",
};

export const unitLabelSingular: Record<MaterialUnit, string> = {
  "sq-ft": "sq.ft",
  piece: "piece",
  box: "box",
  set: "set",
  "running-ft": "running ft",
  sheet: "sheet",
  roll: "roll",
  unit: "unit",
};

export const logisticsLabels: Record<LogisticsMethod, string> = {
  "transport-arranged": "Transport Arranged",
  "self-pickup": "Self Pickup",
  freight: "Freight",
  "local-delivery": "Local Delivery",
};
