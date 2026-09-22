import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const points = [
  "Reach verified B2B buyers actively sourcing inventory",
  "List via auction, buy-now or request-quote pricing",
  "Dedicated seller support for large-volume accounts",
];

export function SellerCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid items-center gap-10 rounded-4xl bg-brand-950 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Turn Excess Inventory Into Revenue.
            </h2>
            <p className="mt-3 max-w-md text-white/65">
              Reach serious buyers looking for wholesale, surplus and
              liquidation inventory — with the tools to sell it efficiently.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-300" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/sell" size="lg">
                Start Selling
                <ArrowRight size={18} />
              </Button>
              <Button href="/#how-it-works" size="lg" variant="dark">
                Learn How It Works
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="https://picsum.photos/seed/lw-seller-cta/900/700"
              alt="Seller preparing inventory for listing"
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
