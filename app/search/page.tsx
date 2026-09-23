import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogueContent } from "@/components/marketplace/CatalogueContent";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search surplus building and interior materials on MaalGodaam.com.",
};

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CatalogueContent eyebrow="Search" title="Search Results" />
      </Suspense>
      <Footer />
    </>
  );
}
