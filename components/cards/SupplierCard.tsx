import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react";
import type { Supplier } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <Link
      href={`/suppliers/${supplier.slug}`}
      className="group flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft-sm ring-1 ring-inset ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-ink-100">
          <Image src={supplier.logoUrl} alt={supplier.name} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-ink-900">{supplier.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
            <MapPin size={12} /> {supplier.location}
          </div>
        </div>
      </div>

      {supplier.verified && (
        <Badge tone="brand" icon={<BadgeCheck size={13} />} className="w-fit">
          Verified Supplier
        </Badge>
      )}

      <div className="flex flex-wrap gap-1.5">
        {supplier.categories.map((c) => (
          <span
            key={c}
            className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-600"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-ink-25 p-3 text-center ring-1 ring-inset ring-ink-100">
        <div>
          <div className="text-sm font-extrabold text-ink-900">
            {formatNumber(supplier.availableInventoryUnits)}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">Available Units</div>
        </div>
        <div className="border-x border-ink-200">
          <div className="inline-flex items-center gap-0.5 text-sm font-extrabold text-ink-900">
            <Star size={12} className="fill-accent-500 text-accent-500" />
            {supplier.rating.toFixed(1)}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">
            {supplier.reviewCount} Reviews
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-0.5 text-sm font-extrabold text-ink-900">
            <MessageCircle size={12} />
            {supplier.responseRate}%
          </div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">Response</div>
        </div>
      </div>

      <span className="mt-auto inline-flex items-center justify-center rounded-xl border border-ink-200 py-2.5 text-sm font-semibold text-ink-900 transition-colors group-hover:border-brand-600 group-hover:text-brand-700">
        View Supplier
      </span>
    </Link>
  );
}
