"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { unitLabels } from "@/lib/labels";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

interface CartLine {
  listingId: string;
  quantity: number;
}

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([
    { listingId: "lot-led-panel-lights-600", quantity: 50 },
    { listingId: "lot-vinyl-flooring-3000", quantity: 300 },
  ]);

  const items = lines
    .map((line) => ({ line, listing: listings.find((l) => l.id === line.listingId)! }))
    .filter((i) => i.listing);

  const unitPrice = (id: string) => {
    const listing = listings.find((l) => l.id === id)!;
    return listing.price / listing.quantity;
  };

  const subtotal = items.reduce((sum, i) => sum + unitPrice(i.line.listingId) * i.line.quantity, 0);
  const transportEstimate = items.length > 0 ? 3500 : 0;

  const updateQty = (id: string, delta: number) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.listingId !== id) return l;
        const listing = listings.find((x) => x.id === id)!;
        return { ...l, quantity: Math.max(listing.minOrderQuantity, l.quantity + delta) };
      })
    );
  };

  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.listingId !== id));

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Your Account
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Cart
          </h1>
          <p className="mt-2 text-ink-500">
            {items.length} {items.length === 1 ? "material" : "materials"} ready for checkout
          </p>

          {items.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
              <ShoppingCart size={32} className="text-ink-300" />
              <h3 className="mt-4 text-lg font-bold text-ink-900">Your cart is empty</h3>
              <Button href="/catalogue" className="mt-5">
                Explore Materials
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-4">
                {items.map(({ line, listing }) => {
                  const step = listing.unit === "sq-ft" || listing.unit === "running-ft" ? 10 : 1;
                  return (
                    <div
                      key={listing.id}
                      className="flex gap-4 rounded-3xl border border-ink-100 bg-white p-4"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-ink-100">
                        <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/product/${listing.slug}`}
                            className="line-clamp-1 text-sm font-bold text-ink-900 hover:text-brand-700"
                          >
                            {listing.title}
                          </Link>
                          <p className="text-xs text-ink-500">
                            {listing.brand} · MOQ {formatNumber(listing.minOrderQuantity)} {unitLabels[listing.unit]}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-ink-200 px-1 py-1">
                            <button
                              onClick={() => updateQty(listing.id, -step)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-12 text-center text-xs font-semibold">
                              {formatNumber(line.quantity)}
                            </span>
                            <button
                              onClick={() => updateQty(listing.id, step)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-ink-900">
                              {formatCurrency(unitPrice(listing.id) * line.quantity)}
                            </span>
                            <button
                              onClick={() => remove(listing.id)}
                              aria-label="Remove"
                              className="text-ink-400 hover:text-danger-500"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-fit rounded-3xl border border-ink-100 bg-white p-5">
                <h2 className="text-base font-bold text-ink-900">Order Summary</h2>
                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-ink-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <span>Estimated Transport</span>
                    <span className="font-semibold text-ink-900">{formatCurrency(transportEstimate)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-ink-100 pt-3 text-base font-extrabold text-ink-900">
                    <span>Estimated Total</span>
                    <span>{formatCurrency(subtotal + transportEstimate)}</span>
                  </div>
                </div>
                <Button href="/checkout" size="lg" className="mt-5 w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
