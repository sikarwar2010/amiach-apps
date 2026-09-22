import { Suspense } from "react";
import type { Metadata } from "next";
import { MarketplaceContent } from "@/components/marketplace/MarketplaceContent";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Browse Inventory",
  description:
    "Search liquidation, overstock, customer returns and wholesale inventory lots from verified sellers across 35+ categories.",
};

export default function MarketplacePage() {
  return (
    <>
      <Suspense fallback={null}>
        <MarketplaceContent />
      </Suspense>
      <Footer />
    </>
  );
}
