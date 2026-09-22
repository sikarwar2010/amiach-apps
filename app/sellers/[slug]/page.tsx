import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react";
import { getSellerById, listings, sellers } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { InventoryCard } from "@/components/cards/InventoryCard";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return sellers.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const seller = getSellerById(params.slug);
  if (!seller) return {};
  return { title: seller.name, description: seller.description ?? `${seller.name} on Lotwise.` };
}

export default function SellerStorePage({ params }: { params: { slug: string } }) {
  const seller = getSellerById(params.slug);
  if (!seller) notFound();

  const sellerListings = listings.filter((l) => l.sellerId === seller.id);

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page">
          <div className="overflow-hidden rounded-4xl bg-ink-900">
            <div className="relative h-32 sm:h-40">
              <Image
                src="https://picsum.photos/seed/lw-seller-banner/1400/300"
                alt=""
                fill
                className="object-cover opacity-40"
              />
            </div>
            <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-8">
              <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-4 ring-ink-900 sm:h-24 sm:w-24">
                  <Image src={seller.logoUrl} alt={seller.name} fill className="object-cover" />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-xl font-extrabold text-white sm:text-2xl">{seller.name}</h1>
                    {seller.verified && <BadgeCheck size={18} className="text-brand-400" />}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-white/60">
                    <MapPin size={13} /> {seller.location}
                  </div>
                </div>
              </div>
              {seller.verified && (
                <Badge tone="brand" icon={<BadgeCheck size={13} />} className="w-fit">
                  Verified Seller
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Active Units", value: formatNumber(seller.activeUnits) },
              { label: "Active Listings", value: formatNumber(seller.activeListings) },
              { label: "Response Rate", value: `${seller.responseRate}%` },
              { label: "Rating", value: `${seller.rating.toFixed(1)} / 5` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-4 text-center">
                <div className="text-xl font-extrabold text-ink-900">{stat.value}</div>
                <div className="mt-0.5 text-xs text-ink-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="fill-urgent-500 text-urgent-500" />
              {seller.rating.toFixed(1)} ({seller.reviewCount} reviews)
            </span>
            <span className="text-ink-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle size={14} /> {seller.responseRate}% response rate
            </span>
            <span className="text-ink-300">·</span>
            <span>Member since {new Date(seller.memberSince).getFullYear()}</span>
          </div>

          <div className="mt-10 pb-24">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900">
              Active Listings ({sellerListings.length})
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sellerListings.map((listing) => (
                <InventoryCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
