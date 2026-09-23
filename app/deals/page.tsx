import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogueContent } from "@/components/marketplace/CatalogueContent";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Deals Around You",
  description:
    "Discover surplus building and interior material deals available near your location, from verified suppliers across India.",
};

export default function DealsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CatalogueContent
          eyebrow="Marketplace"
          title="Deals Around You"
          showLocationChips
        />
      </Suspense>
      <Footer />
    </>
  );
}
