import type { InventoryLot } from "@/lib/types";
import { InventoryCard } from "@/components/cards/InventoryCard";

export function SimilarLots({ listings, title = "Similar Lots" }: { listings: InventoryLot[]; title?: string }) {
  if (listings.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-extrabold tracking-tight text-ink-900">{title}</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {listings.map((listing) => (
          <InventoryCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
