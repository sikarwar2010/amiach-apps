import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogueContent } from "@/components/marketplace/CatalogueContent";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Explore Materials",
  description:
    "Search surplus, overstock, discontinued and clearance building & interior materials from verified suppliers across India.",
};

export default function MaterialsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CatalogueContent />
      </Suspense>
      <Footer />
    </>
  );
}
