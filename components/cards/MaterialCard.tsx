import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Package } from "lucide-react";
import type { MaterialListing } from "@/lib/types";
import { getLocationById, getSupplierById } from "@/lib/mock-data";
import { conditionLabels, conditionTone, dealTypeLabels, unitLabels } from "@/lib/labels";
import { formatCurrency, formatNumber, savingsPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { Button } from "@/components/ui/Button";

const dealCtaLabel: Record<MaterialListing["dealType"], string> = {
  "buy-now": "View Deal",
  "request-quote": "Request Quote",
  "bulk-deal": "View Bulk Deal",
  "contact-supplier": "Contact Supplier",
};

export function MaterialCard({ listing }: { listing: MaterialListing }) {
  const location = getLocationById(listing.locationId);
  const supplier = getSupplierById(listing.supplierId);
  const savings = savingsPercent(listing.marketValue, listing.price);

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
            <Badge tone={conditionTone[listing.condition]}>{conditionLabels[listing.condition]}</Badge>
          </div>
          <WishlistButton size="sm" />
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <Badge tone="dark">{dealTypeLabels[listing.dealType]}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            {listing.brand}
          </div>
          <h3 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-ink-900">
            {listing.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Package size={13} /> {formatNumber(listing.quantity)} {unitLabels[listing.unit]}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {location.city}
            </span>
          )}
        </div>

        {supplier && (
          <div className="flex items-center gap-1 text-xs text-ink-500">
            <span>
              Sold by <span className="font-semibold text-ink-700">{supplier.name}</span>
            </span>
            {supplier.verified && <BadgeCheck size={13} className="text-brand-600" />}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-ink-100 pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-ink-400 line-through">
              {formatCurrency(listing.marketValue)}
            </span>
            {savings > 0 && (
              <span className="text-xs font-semibold text-accent-600">
                Save {savings}%
              </span>
            )}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
                MaalGodaam Price
              </div>
              <div className="text-xl font-extrabold text-brand-800">
                {formatCurrency(listing.price)}
              </div>
            </div>
            <Button
              size="sm"
              variant={listing.dealType === "buy-now" ? "primary" : "outline"}
            >
              {dealCtaLabel[listing.dealType]}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
