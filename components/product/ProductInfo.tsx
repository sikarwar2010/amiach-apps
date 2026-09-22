import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Package } from "lucide-react";
import type { MaterialListing, Supplier, Location } from "@/lib/types";
import { conditionLabels, conditionTone, dealTypeLabels, unitLabels } from "@/lib/labels";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ProductInfo({
  listing,
  supplier,
  location,
}: {
  listing: MaterialListing;
  supplier?: Supplier;
  location?: Location;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={conditionTone[listing.condition]}>{conditionLabels[listing.condition]}</Badge>
        <Badge tone="accent">{dealTypeLabels[listing.dealType]}</Badge>
        {location && (
          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
            <MapPin size={13} /> {location.city}, {location.state}
          </span>
        )}
      </div>

      <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-700">
        {listing.brand}
      </div>
      <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-3xl">
        {listing.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-2xl bg-ink-50 px-3.5 py-2.5 text-sm text-ink-700">
          <Package size={16} className="text-ink-400" />
          <span className="font-semibold">{formatNumber(listing.quantity)} {unitLabels[listing.unit]}</span>
          <span className="text-ink-300">available</span>
        </div>
        <div className="rounded-2xl bg-ink-50 px-3.5 py-2.5 text-sm text-ink-700">
          MOQ: <span className="font-semibold">{formatNumber(listing.minOrderQuantity)} {unitLabels[listing.unit]}</span>
        </div>
      </div>

      {supplier && (
        <Link
          href={`/suppliers/${supplier.slug}`}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-ink-100 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-inset ring-ink-100">
            <Image src={supplier.logoUrl} alt={supplier.name} fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-bold text-ink-900">{supplier.name}</span>
              {supplier.verified && (
                <BadgeCheck size={15} className="shrink-0 text-brand-700" />
              )}
            </div>
            <div className="text-xs text-ink-500">
              {supplier.rating.toFixed(1)} rating · {supplier.responseRate}% response rate
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold text-brand-700">View Supplier</span>
        </Link>
      )}
    </div>
  );
}
