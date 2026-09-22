"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import type { InventoryLot, Seller } from "@/lib/types";
import { shippingLabels } from "@/lib/labels";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

const tabs = ["Description", "Manifest", "Condition", "Shipping", "Seller Info"] as const;

export function ProductTabs({ listing, seller }: { listing: InventoryLot; seller?: Seller }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");

  return (
    <div className="rounded-3xl border border-ink-100 bg-white">
      <div className="flex gap-1 overflow-x-auto border-b border-ink-100 px-3 no-scrollbar sm:px-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative shrink-0 px-4 py-4 text-sm font-semibold transition-colors",
              tab === t ? "text-ink-900" : "text-ink-400 hover:text-ink-600"
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600" />
            )}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {tab === "Description" && (
          <p className="text-sm leading-relaxed text-ink-600">{listing.description}</p>
        )}

        {tab === "Manifest" && (
          <div className="overflow-x-auto">
            {listing.manifest && listing.manifest.length > 0 ? (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                    <th className="py-2 font-medium">SKU</th>
                    <th className="py-2 font-medium">Description</th>
                    <th className="py-2 font-medium">Qty</th>
                    <th className="py-2 font-medium">Unit Retail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {listing.manifest.map((line) => (
                    <tr key={line.sku}>
                      <td className="py-3 font-mono text-xs text-ink-500">{line.sku}</td>
                      <td className="py-3 font-medium text-ink-800">{line.description}</td>
                      <td className="py-3 text-ink-600">{formatNumber(line.quantity)}</td>
                      <td className="py-3 text-ink-600">{formatCurrency(line.unitRetail)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-ink-500">
                A full SKU-level manifest is available after requesting access to
                this lot.
              </p>
            )}
          </div>
        )}

        {tab === "Condition" && (
          <p className="text-sm leading-relaxed text-ink-600">
            {listing.conditionNotes ??
              "Units are graded according to Lotwise's standard condition framework. Contact the seller for a full condition report."}
          </p>
        )}

        {tab === "Shipping" && (
          <div className="flex flex-col gap-3">
            {listing.shippingMethods.map((method) => (
              <div
                key={method}
                className="flex items-center gap-2.5 rounded-xl bg-ink-50 px-3.5 py-3 text-sm text-ink-700"
              >
                <Truck size={16} className="text-ink-400" />
                {shippingLabels[method]}
              </div>
            ))}
          </div>
        )}

        {tab === "Seller Info" && seller && (
          <div className="flex flex-col gap-2 text-sm text-ink-600">
            <p>{seller.description ?? `${seller.name} is a verified seller on Lotwise.`}</p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <div className="text-lg font-extrabold text-ink-900">
                  {formatNumber(seller.activeListings)}
                </div>
                <div className="text-xs text-ink-500">Active Listings</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">{seller.rating.toFixed(1)}</div>
                <div className="text-xs text-ink-500">Rating</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">{seller.responseRate}%</div>
                <div className="text-xs text-ink-500">Response Rate</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">
                  {new Date(seller.memberSince).getFullYear()}
                </div>
                <div className="text-xs text-ink-500">Member Since</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
