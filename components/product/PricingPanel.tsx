"use client";

import { useState } from "react";
import { Gavel, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import type { InventoryLot } from "@/lib/types";
import { formatCurrency, savingsPercent } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

export function PricingPanel({ listing }: { listing: InventoryLot }) {
  const [bidAmount, setBidAmount] = useState(
    listing.currentPrice + Math.max(50, Math.round(listing.currentPrice * 0.02))
  );
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const savings = savingsPercent(listing.retailValue, listing.currentPrice);

  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-soft-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
            Retail Value
          </span>
          <span className="text-sm text-ink-400 line-through">
            {formatCurrency(listing.retailValue)}
          </span>
        </div>
        {savings > 0 && <Badge tone="success">Save {savings}%</Badge>}
      </div>

      <div className="mt-2">
        <div className="text-xs font-medium uppercase tracking-wide text-ink-500">
          {listing.saleFormat === "auction" ? "Current Bid" : listing.saleFormat === "quote" ? "Starting Price" : "Buy Now Price"}
        </div>
        <div className="text-4xl font-extrabold text-ink-900">
          {formatCurrency(listing.currentPrice)}
        </div>
        {listing.saleFormat === "auction" && (
          <div className="mt-1 text-sm text-ink-500">{listing.bidCount ?? 0} bids placed</div>
        )}
      </div>

      {listing.saleFormat === "auction" && listing.auctionEndsAt && (
        <div className="mt-5 rounded-2xl bg-ink-50 p-4">
          <CountdownTimer endsAt={listing.auctionEndsAt} variant="full" />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {listing.saleFormat === "auction" && (
          <>
            <div className="flex items-center gap-2 rounded-xl border border-ink-200 p-1.5">
              <span className="pl-2.5 text-sm font-medium text-ink-500">$</span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full bg-transparent py-2 text-sm font-semibold text-ink-900 focus:outline-none"
              />
            </div>
            <Button
              size="lg"
              onClick={() => setConfirmation(`Bid of ${formatCurrency(bidAmount)} placed.`)}
            >
              <Gavel size={18} /> Place Bid
            </Button>
            {listing.buyNowPrice && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setConfirmation(`Purchased at Buy Now price of ${formatCurrency(listing.buyNowPrice!)}.`)}
              >
                <Zap size={18} /> Buy Now for {formatCurrency(listing.buyNowPrice)}
              </Button>
            )}
          </>
        )}

        {listing.saleFormat === "buy-now" && (
          <Button
            size="lg"
            onClick={() => setConfirmation(`Order placed for ${formatCurrency(listing.currentPrice)}.`)}
          >
            <Zap size={18} /> Buy Now
          </Button>
        )}

        {listing.saleFormat === "quote" && (
          <Button
            size="lg"
            onClick={() => setConfirmation("Quote request sent to the seller.")}
          >
            <MessageSquare size={18} /> Request Quote
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Button size="md" variant="outline" className="flex-1">
            <WishlistButton size="sm" className="static shadow-none ring-0" />
            Add to Wishlist
          </Button>
        </div>
      </div>

      {confirmation && (
        <div className="mt-4 rounded-xl bg-success-50 px-3.5 py-2.5 text-sm font-medium text-success-700 animate-fade-in">
          {confirmation}
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 rounded-2xl bg-brand-50 p-3.5 text-xs text-brand-700">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        Protected by Lotwise Buyer Support — manifests are verified against
        seller listings.
      </div>
    </div>
  );
}
