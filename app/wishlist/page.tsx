import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { InventoryCard } from "@/components/cards/InventoryCard";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  const saved = listings.filter((l) => l.featured).slice(0, 3);

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Your Account
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Wishlist
          </h1>
          <p className="mt-2 text-ink-500">
            {saved.length} saved {saved.length === 1 ? "lot" : "lots"}
          </p>

          {saved.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((listing) => (
                <InventoryCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
              <Heart size={32} className="text-ink-300" />
              <h3 className="mt-4 text-lg font-bold text-ink-900">Your wishlist is empty</h3>
              <p className="mt-1 max-w-sm text-sm text-ink-500">
                Save lots you're interested in to compare and track pricing
                over time.
              </p>
              <Button href="/marketplace" className="mt-5">
                Browse Inventory
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
