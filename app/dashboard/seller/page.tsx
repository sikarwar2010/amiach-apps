import type { Metadata } from "next";
import { Boxes, MessageSquare, TrendingUp } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { MaterialCard } from "@/components/cards/MaterialCard";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Seller Dashboard" };

export default function SellerDashboardPage() {
  const myListings = listings.slice(0, 3);

  const stats = [
    { label: "Active Listings", value: myListings.length, icon: Boxes },
    { label: "Enquiries Received", value: 7, icon: MessageSquare },
    { label: "Views This Month", value: 412, icon: TrendingUp },
  ];

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Seller Dashboard
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                Your Listings
              </h1>
            </div>
            <Button href="/sell-surplus">List New Inventory</Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-3xl border border-ink-100 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="text-2xl font-extrabold text-ink-900">{value}</div>
                  <div className="text-sm text-ink-500">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-ink-900">Active Listings</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {myListings.map((listing) => (
                <MaterialCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
