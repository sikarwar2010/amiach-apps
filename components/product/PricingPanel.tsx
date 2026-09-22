"use client";

import { useState } from "react";
import { Heart, MessageSquare, PackageSearch, ShieldCheck, Zap } from "lucide-react";
import type { MaterialListing } from "@/lib/types";
import { unitLabels } from "@/lib/labels";
import { cn, formatCurrency, savingsPercent } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function PricingPanel({ listing }: { listing: MaterialListing }) {
  const [quantity, setQuantity] = useState(listing.minOrderQuantity);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const savings = savingsPercent(listing.marketValue, listing.price);
  const unit = unitLabels[listing.unit];
  const unitPrice = listing.price / listing.quantity;

  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-soft-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
            Market Value
          </span>
          <span className="text-sm text-ink-400 line-through">
            {formatCurrency(listing.marketValue)}
          </span>
        </div>
        {savings > 0 && <Badge tone="accent">Save {savings}%</Badge>}
      </div>

      <div className="mt-2">
        <div className="text-xs font-medium uppercase tracking-wide text-ink-500">
          MaalGodaam Price
        </div>
        <div className="text-4xl font-extrabold text-brand-800">
          {formatCurrency(listing.price)}
        </div>
        <div className="mt-1 text-sm text-ink-500">
          ≈ {formatCurrency(unitPrice)} per {unit.replace(/s$/, "")}
        </div>
      </div>

      {(listing.dealType === "buy-now" || listing.dealType === "request-quote") && (
        <div className="mt-5">
          <label className="text-xs font-medium text-ink-600">Quantity</label>
          <div className="mt-1.5">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={listing.minOrderQuantity}
              max={listing.quantity}
              step={listing.unit === "sq-ft" || listing.unit === "running-ft" ? 10 : 1}
              unitLabel={`${unit} · MOQ ${listing.minOrderQuantity}`}
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {listing.dealType === "buy-now" && (
          <Button
            size="lg"
            onClick={() =>
              setConfirmation(
                `Order placed for ${quantity} ${unit} — ${formatCurrency(unitPrice * quantity)}.`
              )
            }
          >
            <Zap size={18} /> Buy Now
          </Button>
        )}

        {listing.dealType === "request-quote" && (
          <Button
            size="lg"
            onClick={() =>
              setConfirmation(`Quote requested for ${quantity} ${unit}. The supplier will respond shortly.`)
            }
          >
            <MessageSquare size={18} /> Request Quote
          </Button>
        )}

        {listing.dealType === "bulk-deal" && (
          <Button
            size="lg"
            onClick={() => setConfirmation("Bulk deal enquiry sent to the supplier.")}
          >
            <PackageSearch size={18} /> Start Bulk Deal
          </Button>
        )}

        {listing.dealType !== "contact-supplier" && (
          <Button
            size="lg"
            variant="outline"
            onClick={() => setConfirmation("Your message has been sent to the supplier.")}
          >
            Contact Supplier
          </Button>
        )}

        {listing.dealType === "contact-supplier" && (
          <Button
            size="lg"
            onClick={() => setConfirmation("Your message has been sent to the supplier.")}
          >
            <MessageSquare size={18} /> Contact Supplier
          </Button>
        )}

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className={cn(
            "inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
            saved
              ? "border-danger-200 bg-danger-50 text-danger-600"
              : "border-ink-200 text-ink-900 hover:border-ink-300 hover:bg-ink-50"
          )}
        >
          <Heart size={16} className={saved ? "fill-danger-500 text-danger-500" : ""} />
          {saved ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {confirmation && (
        <div className="mt-4 rounded-xl bg-success-50 px-3.5 py-2.5 text-sm font-medium text-success-700 animate-fade-in">
          {confirmation}
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 rounded-2xl bg-brand-50 p-3.5 text-xs text-brand-800">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        Protected by MaalGodaam Buyer Support — listing details are verified
        against the supplier&apos;s submission.
      </div>
    </div>
  );
}
