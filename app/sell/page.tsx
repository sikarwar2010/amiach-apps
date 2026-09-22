import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSection } from "@/components/home/TrustSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sell Your Inventory",
  description: "List liquidation, surplus and overstock inventory on Lotwise and reach verified B2B buyers.",
};

const benefits = [
  { icon: Users, title: "Verified buyer network", description: "Reach thousands of active resellers and retailers searching for bulk inventory." },
  { icon: Zap, title: "Flexible sale formats", description: "List via auction, buy-now or request-quote pricing depending on the lot." },
  { icon: TrendingUp, title: "Maximize recovery", description: "Competitive bidding and transparent manifests help you recover more value." },
];

export default function SellPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <section className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
                For Sellers
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                Turn Excess Inventory Into Revenue.
              </h1>
              <p className="mt-4 max-w-lg text-lg text-ink-500">
                Reach serious buyers looking for wholesale, surplus and
                liquidation inventory — with the tools to sell it efficiently.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#seller-form" size="lg">
                  Start Selling <ArrowRight size={18} />
                </Button>
                <Button href="/#how-it-works" size="lg" variant="outline">
                  Learn How It Works
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-4xl shadow-soft-xl">
              <Image
                src="https://picsum.photos/seed/lw-sell-hero/900/700"
                alt="Seller preparing bulk inventory for listing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page grid grid-cols-1 gap-5 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-3xl border border-ink-100 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <HowItWorks />
        <TrustSection />

        <section id="seller-form" className="scroll-mt-28 py-16 sm:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-xl rounded-4xl border border-ink-100 bg-white p-8 shadow-soft-sm sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                Apply to Become a Seller
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Tell us about your inventory and our partnerships team will
                follow up within one business day.
              </p>
              <form className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-ink-600">Company Name</label>
                    <input className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 px-3.5 text-sm focus:border-brand-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-600">Business Email</label>
                    <input type="email" className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 px-3.5 text-sm focus:border-brand-400 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-600">Primary Inventory Category</label>
                  <input className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 px-3.5 text-sm focus:border-brand-400 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-600">Tell us about your inventory</label>
                  <textarea rows={4} className="mt-1.5 w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none" />
                </div>
                <Button type="submit" size="lg" className="mt-2">
                  Submit Application <CheckCircle2 size={18} />
                </Button>
              </form>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
