"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import type { MaterialListing, Supplier } from "@/lib/types";
import { logisticsLabels, unitLabels } from "@/lib/labels";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const tabs = ["Description", "Specifications", "Condition", "Shipping", "Supplier Info"] as const;

export function ProductTabs({ listing, supplier }: { listing: MaterialListing; supplier?: Supplier }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");

  const detailRows: { label: string; value?: string }[] = [
    { label: "Dimensions", value: listing.dimensions },
    { label: "Material", value: listing.material },
    { label: "Finish", value: listing.finish },
    { label: "Color", value: listing.color },
    { label: "Packaging", value: listing.packaging },
    { label: "Quantity Available", value: `${formatNumber(listing.quantity)} ${unitLabels[listing.unit]}` },
    { label: "Minimum Order Quantity", value: `${formatNumber(listing.minOrderQuantity)} ${unitLabels[listing.unit]}` },
  ].filter((row) => row.value);

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
              <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-500" />
            )}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {tab === "Description" && (
          <p className="text-sm leading-relaxed text-ink-600">{listing.description}</p>
        )}

        {tab === "Specifications" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <tbody className="divide-y divide-ink-100">
                {detailRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 pr-6 font-medium text-ink-500">{row.label}</td>
                    <td className="py-3 text-ink-800">{row.value}</td>
                  </tr>
                ))}
                {listing.specifications.map((spec) => (
                  <tr key={spec.label}>
                    <td className="py-3 pr-6 font-medium text-ink-500">{spec.label}</td>
                    <td className="py-3 text-ink-800">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Condition" && (
          <p className="text-sm leading-relaxed text-ink-600">
            {listing.conditionNotes ??
              "This listing follows MaalGodaam's standard condition framework. Contact the supplier for a full condition report."}
          </p>
        )}

        {tab === "Shipping" && (
          <div className="flex flex-col gap-3">
            {listing.logisticsMethods.map((method) => (
              <div
                key={method}
                className="flex items-center gap-2.5 rounded-xl bg-ink-50 px-3.5 py-3 text-sm text-ink-700"
              >
                <Truck size={16} className="text-ink-400" />
                {logisticsLabels[method]}
              </div>
            ))}
          </div>
        )}

        {tab === "Supplier Info" && supplier && (
          <div className="flex flex-col gap-2 text-sm text-ink-600">
            <p>{supplier.description ?? `${supplier.name} is a verified supplier on MaalGodaam.com.`}</p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <div className="text-lg font-extrabold text-ink-900">
                  {formatNumber(supplier.activeListings)}
                </div>
                <div className="text-xs text-ink-500">Active Listings</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">{supplier.rating.toFixed(1)}</div>
                <div className="text-xs text-ink-500">Rating</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">{supplier.responseRate}%</div>
                <div className="text-xs text-ink-500">Response Rate</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-ink-900">
                  {supplier.yearsActive ? `${supplier.yearsActive} yrs` : "—"}
                </div>
                <div className="text-xs text-ink-500">Experience</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
