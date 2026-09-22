import Image from "next/image";
import Link from "next/link";
import { Gavel, MapPin, Package, Zap } from "lucide-react";
import type { InventoryLot } from "@/lib/types";
import { getLocationById, getSellerById } from "@/lib/mock-data";
import { conditionLabels, lotSizeLabels } from "@/lib/labels";
import { formatCurrency, formatNumber, savingsPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/Button";

export function InventoryCard({ listing }: { listing: InventoryLot }) {
  const location = getLocationById(listing.locationId);
  const seller = getSellerById(listing.sellerId);
  const savings = savingsPercent(listing.retailValue, listing.currentPrice);

  const ctaLabel =
    listing.saleFormat === "auction"
      ? "Place Bid"
      : listing.saleFormat === "quote"
      ? "Request Quote"
      : "View Deal";

  return (
    <Link
      href={`/product/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft-sm ring-1 ring-inset ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(min-width: 1280px) 23vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="dark">{conditionLabels[listing.condition]}</Badge>
            {listing.saleFormat === "auction" && (
              <Badge tone="urgent" icon={<Gavel size={11} />}>
                Auction
              </Badge>
            )}
            {listing.saleFormat === "buy-now" && (
              <Badge tone="brand" icon={<Zap size={11} />}>
                Buy Now
              </Badge>
            )}
          </div>
          <WishlistButton size="sm" />
        </div>
        {listing.saleFormat === "auction" && listing.auctionEndsAt && (
          <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur">
            <CountdownTimer endsAt={listing.auctionEndsAt} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {listing.brand}
          </div>
          <h3 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-ink-900">
            {listing.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Package size={13} /> {formatNumber(listing.quantity)} units · {lotSizeLabels[listing.lotSize]}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {location.city}, {location.stateCode}
            </span>
          )}
        </div>

        {seller && (
          <div className="text-xs text-ink-500">
            Sold by{" "}
            <span className="font-semibold text-ink-700">{seller.name}</span>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-ink-100 pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-ink-400 line-through">
              {formatCurrency(listing.retailValue)}
            </span>
            {savings > 0 && (
              <span className="text-xs font-semibold text-success-600">
                Save {savings}%
              </span>
            )}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
                {listing.saleFormat === "auction" ? "Current Bid" : "Price"}
              </div>
              <div className="text-xl font-extrabold text-ink-900">
                {formatCurrency(listing.currentPrice)}
              </div>
              {listing.saleFormat === "auction" && (
                <div className="text-xs text-ink-500">{listing.bidCount ?? 0} bids</div>
              )}
            </div>
            <Button size="sm" variant={listing.saleFormat === "quote" ? "outline" : "primary"}>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
