import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationById, locations } from "@/lib/mock-data";
import { CatalogueContent } from "@/components/marketplace/CatalogueContent";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.id }));
}

export function generateMetadata({
  params,
}: {
  params: { location: string };
}): Metadata {
  const location = getLocationById(params.location);
  if (!location) return {};
  return {
    title: `Deals in ${location.city}`,
    description: `Surplus building and interior material deals available in ${location.city}, ${location.state} from verified suppliers.`,
  };
}

export default function DealsByLocationPage({
  params,
}: {
  params: { location: string };
}) {
  const location = getLocationById(params.location);
  if (!location) notFound();

  return (
    <>
      <Suspense fallback={null}>
        <CatalogueContent
          eyebrow="Deals Around You"
          title={`Deals in ${location.city}`}
          presetLocation={location.id}
          showLocationChips
        />
      </Suspense>
      <Footer />
    </>
  );
}
