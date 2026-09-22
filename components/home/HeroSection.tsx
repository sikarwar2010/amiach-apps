import Image from "next/image";
import { ArrowRight, Gavel, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { heroStats } from "@/lib/mock-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.brand.50),transparent)]"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
            <TrendingUp size={13} />
            Bulk deals added every day
          </span>

          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            Source Surplus Inventory.
            <br />
            Build Your Next Big Deal.
          </h1>

          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-500">
            Discover liquidation, overstock, customer returns and wholesale
            inventory from trusted sellers — all in one marketplace built for
            serious buyers.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/marketplace" size="lg">
              Explore Inventory
              <ArrowRight size={18} />
            </Button>
            <Button href="/sell" size="lg" variant="outline">
              Sell Your Inventory
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-extrabold text-ink-900 sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs leading-snug text-ink-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-soft-xl sm:aspect-[5/6]">
            <Image
              src="https://picsum.photos/seed/lw-hero-warehouse/1000/1250"
              alt="Warehouse pallets of surplus inventory ready for shipment"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 top-8 hidden w-52 animate-fade-up rounded-2xl bg-white p-4 shadow-soft-lg [animation-delay:400ms] sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-urgent-50 text-urgent-600">
                <Gavel size={16} />
              </span>
              <div>
                <div className="text-xs text-ink-500">Live Auction</div>
                <div className="text-sm font-bold text-ink-900">48 units · iPhone 15 Pro</div>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-ink-400">Current Bid</div>
                <div className="text-lg font-extrabold text-brand-700">$18,500</div>
              </div>
              <span className="text-xs font-semibold text-urgent-600">04h 32m</span>
            </div>
          </div>

          <div className="absolute -right-4 bottom-8 hidden w-56 animate-fade-up rounded-2xl bg-white p-4 shadow-soft-lg [animation-delay:550ms] sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-50 text-success-600">
                <ShieldCheck size={16} />
              </span>
              <div className="text-sm font-bold text-ink-900">Verified Seller Network</div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-500">
              Every seller is reviewed and monitored for buyer protection.
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-soft-lg backdrop-blur sm:hidden">
            <MapPin size={16} className="text-brand-600" />
            <span className="text-xs font-medium text-ink-700">
              12,000+ active listings across 62 cities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
