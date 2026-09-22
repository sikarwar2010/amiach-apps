import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Plug,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Bento-style spans for the first row so the section reads as a
// designed layout instead of a uniform grid.
const spanClasses = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

// A brand-tinted icon accent keeps each tile legible and on-brand
// regardless of the underlying placeholder photo.
const categoryIcons: Record<string, typeof Smartphone> = {
  electronics: Smartphone,
  fashion: Shirt,
  "home-furniture": Sofa,
  beauty: Sparkles,
  kitchen: UtensilsCrossed,
  appliances: Plug,
};

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 max-w-xl text-ink-500">
              From consumer electronics to industrial equipment — find the
              inventory that fits your resale channel.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:inline-flex"
          >
            View all categories <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar lg:grid lg:grid-cols-8 lg:overflow-visible lg:pb-0">
          {categories.slice(0, 6).map((category, i) => {
            const Icon = categoryIcons[category.id] ?? Sparkles;
            return (
              <Link
                key={category.id}
                href={`/marketplace?category=${category.slug}`}
                className={cn(
                  "group relative flex h-56 w-[72%] shrink-0 overflow-hidden rounded-3xl shadow-soft-sm ring-1 ring-inset ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:w-[42%] lg:h-auto lg:w-auto lg:shrink",
                  spanClasses[i]
                )}
              >
                <Image
                  src={category.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-900/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" />
                <Icon
                  size={72}
                  strokeWidth={1.25}
                  className="absolute -right-3 -top-3 text-white/15"
                />
                <div className="relative mt-auto flex w-full items-end justify-between p-4">
                  <div>
                    <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-base font-bold text-white">{category.name}</h3>
                    <p className="text-xs text-white/75">
                      {formatNumber(category.listingCount)} listings
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/marketplace"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 sm:hidden"
        >
          View all categories <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
