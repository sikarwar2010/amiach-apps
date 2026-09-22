import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  return (
    <section className="py-8 sm:py-10">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <Image
              src="https://picsum.photos/seed/lw-promo-pallets/1600/900"
              alt="Bulk pallets of inventory staged for resale"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg px-6 sm:px-12">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                Buy More.
                <br />
                Save More.
                <br />
                Grow Faster.
              </h2>
              <p className="mt-4 max-w-sm text-white/75">
                Unlock bulk inventory opportunities from trusted suppliers and
                strengthen your margins on every lot.
              </p>
              <Button href="/marketplace?lotSize=truckload" size="lg" className="mt-6">
                Explore Bulk Deals
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
