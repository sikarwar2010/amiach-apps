"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WishlistButton({
  initialActive = false,
  className,
  size = "md",
  onToggle,
}: {
  initialActive?: boolean;
  className?: string;
  size?: "sm" | "md";
  onToggle?: (active: boolean) => void;
}) {
  const [active, setActive] = useState(initialActive);
  const [pop, setPop] = useState(false);

  const dimension = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const iconSize = size === "sm" ? 15 : 17;

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = !active;
        setActive(next);
        onToggle?.(next);
        if (next) {
          setPop(true);
          setTimeout(() => setPop(false), 260);
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white/95 text-ink-500 shadow-soft-sm ring-1 ring-inset ring-ink-100 backdrop-blur transition-all duration-150 hover:text-danger-500",
        dimension,
        className
      )}
    >
      <Heart
        size={iconSize}
        className={cn(
          "transition-transform duration-200",
          pop && "scale-125",
          active && "fill-danger-500 text-danger-500"
        )}
      />
    </button>
  );
}
