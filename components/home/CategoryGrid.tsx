import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Droplet,
  LayoutGrid,
  Layers,
  PaintBucket,
  Sofa,
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof LayoutGrid> = {
  tiles: LayoutGrid,
  furniture: Sofa,
  sanitaryware: Droplet,
  plywood: Layers,
  "interior-walls": PaintBucket,
};

// The five headline categories, shown as an angled, interlocking panel
// strip — the wide-format editorial layout from the brand reference.
const featured = ["tiles", "furniture", "sanitaryware", "plywood", "interior-walls"];

export function CategoryGrid() {
  const featuredCategories = featured
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Everything You Need to Build Better
            </h2>
            <p className="mt-2 max-w-xl text-ink-500">
              From structural essentials to finishing touches — find quality
              surplus material across every category.
            </p>
          </div>
          <Link
            href="/materials"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex"
          >
            View all categories <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Desktop: angled interlocking panel strip */}
        <div className="mt-8 hidden overflow-hidden rounded-4xl lg:flex lg:h-[420px]">
          {featuredCategories.map((category, i) => {
            const Icon = categoryIcons[category.id] ?? LayoutGrid;
            const isFirst = i === 0;
            const isLast = i === featuredCategories.length - 1;
            return (
              <Link
                key={category.id}
                href={`/materials/${category.slug}`}
                style={{
                  clipPath: isFirst
                    ? "polygon(0 0, 100% 0, 92% 100%, 0 100%)"
                    : isLast
                      ? "polygon(8% 0, 100% 0, 100% 100%, 0 100%)"
                      : "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                  marginLeft: isFirst ? 0 : "-3.5%",
                }}
                className="group relative flex-1 basis-0 transition-[flex-grow] duration-500 ease-out hover:flex-[1.35]"
              >
                <Image
                  src={category.imageUrl}
                  alt=""
                  fill
                  sizes="30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 pl-[12%]">
                  <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                    {category.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/70">{category.descriptor}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile / tablet: horizontal scroll cards */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar lg:hidden">
          {featuredCategories.map((category) => {
            const Icon = categoryIcons[category.id] ?? LayoutGrid;
            return (
              <Link
                key={category.id}
                href={`/materials/${category.slug}`}
                className="group relative flex h-56 w-[72%] shrink-0 overflow-hidden rounded-3xl shadow-soft-sm ring-1 ring-inset ring-ink-100 sm:w-[42%]"
              >
                <Image
                  src={category.imageUrl}
                  alt=""
                  fill
                  sizes="60vw"
                  className={cn("object-cover transition-transform duration-500 group-hover:scale-110")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                <div className="relative mt-auto flex w-full items-end justify-between p-4">
                  <div>
                    <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-base font-bold text-white">{category.name}</h3>
                    <p className="text-xs text-white/75">{category.descriptor}</p>
                    <p className="mt-0.5 text-[11px] text-white/60">
                      {formatNumber(category.listingCount)} listings
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/materials"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 lg:hidden"
        >
          View all categories <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
