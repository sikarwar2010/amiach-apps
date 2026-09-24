// Demo data for the dashboards. Replace with API calls (orders, enquiries, moderation queues)
// once the backend exists — components only depend on these shapes.
import { listings } from "./mock-data";
import type { AdminAccountRow } from "@/app/onboarding/actions";

export type ListingStatus = "live" | "pending" | "draft" | "rejected";

export interface VendorListingRow {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  quantity: number;
  unit: string;
  price: number;
  status: ListingStatus;
  views: number;
  enquiries: number;
}

const STATUS_CYCLE: ListingStatus[] = ["live", "live", "pending", "live", "draft", "live", "rejected"];

export const vendorListings: VendorListingRow[] = listings.slice(0, 7).map((l, i) => ({
  id: l.id,
  slug: l.slug,
  title: l.title,
  categoryId: l.categoryId,
  quantity: l.quantity,
  unit: l.unit,
  price: l.price,
  status: STATUS_CYCLE[i % STATUS_CYCLE.length],
  views: 120 + i * 64,
  enquiries: (i * 3) % 9,
}));

export interface VendorEnquiry {
  id: string;
  buyer: string;
  buyerType: "B2B" | "B2C";
  listingTitle: string;
  type: "Quote" | "Bulk deal" | "Contact";
  quantity: string;
  message: string;
  when: string;
  status: "new" | "responded";
}

export const vendorEnquiries: VendorEnquiry[] = [
  { id: "e1", buyer: "Kapoor Builders Pvt. Ltd.", buyerType: "B2B", listingTitle: "Premium Marble Finish Tile", type: "Bulk deal", quantity: "2,400 sq.ft", message: "Need full lot delivered to Noida site. Best price?", when: "2h ago", status: "new" },
  { id: "e2", buyer: "Aarav Sharma", buyerType: "B2C", listingTitle: "Premium Marble Finish Tile", type: "Quote", quantity: "300 sq.ft", message: "Home renovation — can you deliver to Gurugram?", when: "Yesterday", status: "new" },
  { id: "e3", buyer: "Studio Nine Interiors", buyerType: "B2B", listingTitle: "Commercial Vinyl Flooring Rolls", type: "Contact", quantity: "1,000 sq.ft", message: "Do you have the slate grey in 2m rolls only?", when: "2 days ago", status: "responded" },
  { id: "e4", buyer: "R. Malhotra", buyerType: "B2C", listingTitle: "LED Panel Lights", type: "Quote", quantity: "40 pcs", message: "Need invoice with GST for office fit-out.", when: "4 days ago", status: "responded" },
];

export const adminSeedAccounts: AdminAccountRow[] = [
  { id: "seed_1", name: "Manish Gupta", email: "manish@shreeji.example", role: "vendor", accountType: "b2b", verification: "pending", company: "Shreeji Tile Distributors", createdAt: Date.now() - 1 * 86400000 },
  { id: "seed_2", name: "Neha Verma", email: "neha@urbannest.example", role: "vendor", accountType: "b2b", verification: "pending", company: "Urban Nest Furniture", createdAt: Date.now() - 2 * 86400000 },
  { id: "seed_3", name: "Imran Khan", email: "imran@aquafit.example", role: "vendor", accountType: "b2b", verification: "verified", company: "AquaFit Sanitaryware Co.", createdAt: Date.now() - 9 * 86400000 },
  { id: "seed_4", name: "Sunita Rao", email: "sunita@example.com", role: "vendor", accountType: "b2c", verification: "pending", createdAt: Date.now() - 3 * 86400000 },
  { id: "seed_5", name: "Riya Kapoor", email: "riya@kapoorbuilders.example", role: "customer", accountType: "b2b", verification: "pending", company: "Kapoor Builders Pvt. Ltd.", createdAt: Date.now() - 4 * 86400000 },
  { id: "seed_6", name: "Aarav Sharma", email: "aarav@example.com", role: "customer", accountType: "b2c", verification: "verified", createdAt: Date.now() - 12 * 86400000 },
  { id: "seed_7", name: "Tarun Bansal", email: "tarun@bansalbuild.example", role: "customer", accountType: "b2b", verification: "verified", company: "Bansal Constructions", createdAt: Date.now() - 20 * 86400000 },
  { id: "seed_8", name: "Kavita Joshi", email: "kavita@wallcraft.example", role: "vendor", accountType: "b2b", verification: "rejected", company: "WallCraft Interiors", createdAt: Date.now() - 6 * 86400000 },
];
