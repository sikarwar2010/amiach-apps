import Image from "next/image";
import { ArrowRight, Layers, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { heroTrustIndicators } from "@/lib/mock-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.brand.50),transparent)]"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-inset ring-brand-100">
            Build More for Less
          </span>

          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            Quality Surplus.
            <br />
            Greater Possibilities.
          </h1>

          <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-500">
            Premium building &amp; interior materials at exceptional value.
            Discover quality surplus, excess and overstock materials from
            trusted suppliers across India.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/catalogue" size="lg">
              Explore Materials
              <ArrowRight size={18} />
            </Button>
            <Button href="/sell-surplus" size="lg" variant="brand">
              Sell Your Surplus
            </Button>
            <Button href="/post-requirement" size="lg" variant="outline">
              Post Your Requirement
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {heroTrustIndicators.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600"
              >
                <ShieldCheck size={14} className="text-brand-600" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-soft-xl sm:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1000&h=1250&fit=crop&auto=format&q=80"
              alt="Premium surplus tiles, plywood and interior materials staged in a warehouse"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 top-8 hidden w-56 animate-fade-up rounded-2xl bg-white p-4 shadow-soft-lg [animation-delay:400ms] sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Layers size={16} />
              </span>
              <div>
                <div className="text-xs text-ink-500">Available Now</div>
                <div className="text-sm font-bold text-ink-900">2,400 sq.ft · Marble Tile</div>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-ink-400">MaalGodaam Price</div>
                <div className="text-lg font-extrabold text-brand-800">₹98,000</div>
              </div>
              <span className="text-xs font-semibold text-accent-600">Save 45%</span>
            </div>
          </div>

          <div className="absolute -right-4 bottom-8 hidden w-56 animate-fade-up rounded-2xl bg-white p-4 shadow-soft-lg [animation-delay:550ms] sm:block">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <ShieldCheck size={16} />
              </span>
              <div className="text-sm font-bold text-ink-900">Verified Supplier Network</div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-500">
              Every supplier is reviewed before listing goes live.
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 shadow-soft-lg backdrop-blur sm:hidden">
            <MapPin size={16} className="text-brand-700" />
            <span className="text-xs font-medium text-ink-700">
              Materials available across 42+ Indian cities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
