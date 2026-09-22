import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  getListingById,
  getLocationById,
  getRelatedListings,
  getSellerById,
  listings,
} from "@/lib/mock-data";
import { conditionLabels } from "@/lib/labels";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { PricingPanel } from "@/components/product/PricingPanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { SimilarLots } from "@/components/product/SimilarLots";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const listing = getListingById(params.slug);
  if (!listing) return {};
  return {
    title: listing.title,
    description: listing.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const listing = getListingById(params.slug);
  if (!listing) notFound();

  const seller = getSellerById(listing.sellerId);
  const location = getLocationById(listing.locationId);
  const related = getRelatedListings(listing);

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-ink-400">
            <Link href="/" className="hover:text-ink-700">Home</Link>
            <ChevronRight size={12} />
            <Link href="/marketplace" className="hover:text-ink-700">Marketplace</Link>
            <ChevronRight size={12} />
            <span className="text-ink-600">{conditionLabels[listing.condition]}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ImageGallery images={listing.images} title={listing.title} />

            <div className="flex flex-col gap-6">
              <ProductInfo listing={listing} seller={seller} location={location} />
              <PricingPanel listing={listing} />
            </div>
          </div>

          <div className="mt-12">
            <ProductTabs listing={listing} seller={seller} />
          </div>

          <div className="mt-14">
            <SimilarLots listings={related} />
          </div>
        </div>
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}
