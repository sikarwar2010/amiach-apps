import type { Metadata } from "next";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustedSuppliers } from "@/components/home/TrustedSuppliers";
import { WhyMaalGodaam } from "@/components/home/WhyMaalGodaam";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How buying and selling surplus building & interior materials works on MaalGodaam.com.",
};

export default function HowItWorksPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            How It Works
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            A simple path to sourcing or selling surplus material.
          </h1>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/materials">Explore Materials</Button>
            <Button href="/sell-surplus" variant="outline">Sell Your Surplus</Button>
          </div>
        </div>

        <HowItWorks />
        <WhyMaalGodaam />
        <TrustedSuppliers />
      </main>
      <Footer />
    </>
  );
}
