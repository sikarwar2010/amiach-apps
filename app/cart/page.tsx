"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

interface CartLine {
  listingId: string;
  lots: number;
}

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([
    { listingId: "lot-dyson-vacuum-120", lots: 1 },
    { listingId: "lot-kitchenaid-mixers-72", lots: 2 },
  ]);

  const items = lines
    .map((line) => ({ line, listing: listings.find((l) => l.id === line.listingId)! }))
    .filter((i) => i.listing);

  const subtotal = items.reduce((sum, i) => sum + i.listing.currentPrice * i.line.lots, 0);
  const shippingEstimate = items.length > 0 ? 1250 : 0;

  const updateQty = (id: string, delta: number) => {
    setLines((prev) =>
      prev.map((l) => (l.listingId === id ? { ...l, lots: Math.max(1, l.lots + delta) } : l))
    );
  };

  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.listingId !== id));

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Your Account
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Cart
          </h1>
          <p className="mt-2 text-ink-500">
            {items.length} {items.length === 1 ? "lot" : "lots"} ready for checkout
          </p>

          {items.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
              <ShoppingCart size={32} className="text-ink-300" />
              <h3 className="mt-4 text-lg font-bold text-ink-900">Your cart is empty</h3>
              <Button href="/marketplace" className="mt-5">
                Browse Inventory
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-4">
                {items.map(({ line, listing }) => (
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
                          className="line-clamp-1 text-sm font-bold text-ink-900 hover:text-brand-600"
                        >
                          {listing.title}
                        </Link>
                        <p className="text-xs text-ink-500">{listing.brand} · {listing.quantity} units/lot</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-ink-200 px-1 py-1">
                          <button
                            onClick={() => updateQty(listing.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold">{line.lots}</span>
                          <button
                            onClick={() => updateQty(listing.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-ink-900">
                            {formatCurrency(listing.currentPrice * line.lots)}
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
                ))}
              </div>

              <div className="h-fit rounded-3xl border border-ink-100 bg-white p-5">
                <h2 className="text-base font-bold text-ink-900">Order Summary</h2>
                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-ink-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-ink-900">{formatCurrency(shippingEstimate)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-ink-100 pt-3 text-base font-extrabold text-ink-900">
                    <span>Estimated Total</span>
                    <span>{formatCurrency(subtotal + shippingEstimate)}</span>
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
