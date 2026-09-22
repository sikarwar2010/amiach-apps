import { formatCurrency, savingsPercent } from "@/lib/utils";
import { Badge } from "./Badge";

export function PriceDisplay({
  retailValue,
  currentPrice,
  priceLabel = "Buy Now Price",
  size = "md",
}: {
  retailValue: number;
  currentPrice: number;
  priceLabel?: string;
  size?: "sm" | "md" | "lg";
}) {
  const savings = savingsPercent(retailValue, currentPrice);

  const priceSize =
    size === "lg" ? "text-3xl sm:text-4xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Retail Value
        </span>
        <span className="text-sm text-ink-400 line-through">
          {formatCurrency(retailValue)}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-ink-500">
            {priceLabel}
          </div>
          <div className={`font-extrabold text-ink-900 ${priceSize}`}>
            {formatCurrency(currentPrice)}
          </div>
        </div>
        {savings > 0 && (
          <Badge tone="success">Save {savings}%</Badge>
        )}
      </div>
    </div>
  );
}
