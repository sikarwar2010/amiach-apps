import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react";
import { getSupplierById, listings, suppliers } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { MaterialCard } from "@/components/cards/MaterialCard";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return suppliers.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const supplier = getSupplierById(params.slug);
  if (!supplier) return {};
  return { title: supplier.name, description: supplier.description ?? `${supplier.name} on MaalGodaam.com.` };
}

export default function SupplierProfilePage({ params }: { params: { slug: string } }) {
  const supplier = getSupplierById(params.slug);
  if (!supplier) notFound();

  const supplierListings = listings.filter((l) => l.supplierId === supplier.id);

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page">
          <div className="overflow-hidden rounded-4xl bg-brand-950">
            <div className="relative h-32 sm:h-40">
              <Image
                src="https://images.unsplash.com/photo-1672552226380-486fe900b322?w=1400&h=300&fit=crop&auto=format&q=80"
                alt=""
                fill
                className="object-cover opacity-30"
              />
            </div>
            <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-8">
              <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-4 ring-brand-950 sm:h-24 sm:w-24">
                  <Image src={supplier.logoUrl} alt={supplier.name} fill className="object-cover" />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-xl font-extrabold text-white sm:text-2xl">{supplier.name}</h1>
                    {supplier.verified && <BadgeCheck size={18} className="text-accent-400" />}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-white/60">
                    <MapPin size={13} /> {supplier.location}
                  </div>
                </div>
              </div>
              {supplier.verified && (
                <Badge tone="accent" icon={<BadgeCheck size={13} />} className="w-fit">
                  Verified Supplier
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Available Units", value: formatNumber(supplier.availableInventoryUnits) },
              { label: "Active Listings", value: formatNumber(supplier.activeListings) },
              { label: "Response Rate", value: `${supplier.responseRate}%` },
              { label: "Rating", value: `${supplier.rating.toFixed(1)} / 5` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-4 text-center">
                <div className="text-xl font-extrabold text-ink-900">{stat.value}</div>
                <div className="mt-0.5 text-xs text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="fill-accent-500 text-accent-500" />
              {supplier.rating.toFixed(1)} ({supplier.reviewCount} reviews)
            </span>
            <span className="text-ink-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle size={14} /> {supplier.responseRate}% response rate
            </span>
            {supplier.yearsActive && (
              <>
                <span className="text-ink-300">·</span>
                <span>{supplier.yearsActive} years in business</span>
              </>
            )}
          </div>

          <div className="mt-10 pb-24">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900">
              Active Listings ({supplierListings.length})
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {supplierListings.map((listing) => (
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
