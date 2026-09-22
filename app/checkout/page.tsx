"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/auth/AuthCard";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutPage() {
  const [placed, setPlaced] = useState(false);
  const sample = listings.slice(1, 3);
  const subtotal = sample.reduce((sum, l) => sum + l.price, 0);
  const transport = 3500;

  if (placed) {
    return (
      <>
        <main className="flex min-h-screen items-center justify-center px-4 pt-28 sm:pt-32">
          <div className="max-w-md rounded-4xl border border-ink-100 bg-white p-10 text-center shadow-soft-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
              <CheckCircle2 size={26} />
            </span>
            <h1 className="mt-4 text-xl font-extrabold text-ink-900">Order confirmed</h1>
            <p className="mt-2 text-sm text-ink-500">
              A confirmation has been sent to your business email. Your
              supplier will coordinate transport details shortly.
            </p>
            <Button href="/materials" className="mt-6">
              Continue Browsing
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-1.5 text-sm text-ink-500">
            Buy Now items are confirmed immediately. Quote and bulk deal
            items will be confirmed directly by the supplier.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPlaced(true);
            }}
            className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
          >
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-ink-100 bg-white p-6">
                <h2 className="text-base font-bold text-ink-900">Delivery Details</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AuthField label="Company Name" placeholder="Acme Builders Pvt. Ltd." />
                  <AuthField label="Contact Email" type="email" placeholder="you@company.com" />
                  <div className="sm:col-span-2">
                    <AuthField label="Delivery Address" placeholder="Plot 12, Industrial Area" />
                  </div>
                  <AuthField label="City" placeholder="Gurugram" />
                  <AuthField label="State" placeholder="Haryana" />
                  <AuthField label="PIN Code" placeholder="122001" />
                </div>
              </div>

              <div className="rounded-3xl border border-ink-100 bg-white p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
                  <Lock size={15} /> Payment (Buy Now Items)
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <AuthField label="Card Number" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <AuthField label="Expiry" placeholder="MM/YY" />
                  <AuthField label="CVC" placeholder="•••" />
                </div>
              </div>
            </div>

            <div className="h-fit rounded-3xl border border-ink-100 bg-white p-5">
              <h2 className="text-base font-bold text-ink-900">Order Summary</h2>
              <div className="mt-4 flex flex-col gap-3">
                {sample.map((l) => (
                  <div key={l.id} className="flex justify-between text-sm text-ink-600">
                    <span className="line-clamp-1 pr-3">{l.title}</span>
                    <span className="shrink-0 font-semibold text-ink-900">
                      {formatCurrency(l.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-4 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Estimated Transport</span>
                  <span>{formatCurrency(transport)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-ink-900">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal + transport)}</span>
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-5 w-full">
                Place Order
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
