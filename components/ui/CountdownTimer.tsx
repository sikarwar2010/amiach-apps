"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function getRemaining(endsAt: string) {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { diff, hours, minutes, seconds };
}

export function CountdownTimer({
  endsAt,
  variant = "compact",
}: {
  endsAt: string;
  variant?: "compact" | "full";
}) {
  // Start unresolved so server and first client render match exactly;
  // the real countdown is computed client-side only, after mount.
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(endsAt));
    const interval = setInterval(() => setRemaining(getRemaining(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (!remaining) {
    return variant === "compact" ? (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400">
        Ends in --h --m --s
      </span>
    ) : (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
          Auction Ends In
        </span>
        <div className="flex items-center gap-2">
          {["Hours", "Minutes", "Seconds"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-ink-100 text-ink-900">
                <span className="text-xl font-bold tabular-nums leading-none">--</span>
              </div>
              {i < 2 && <span className="text-lg font-medium text-ink-300">:</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isUrgent = remaining.diff < 1000 * 60 * 60;
  const isOver = remaining.diff <= 0;

  if (variant === "compact") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold tabular-nums",
          isOver ? "text-ink-400" : isUrgent ? "text-urgent-600" : "text-ink-600"
        )}
      >
        {isOver
          ? "Auction ended"
          : `Ends in ${remaining.hours > 0 ? `${pad(remaining.hours)}h ` : ""}${pad(
              remaining.minutes
            )}m ${pad(remaining.seconds)}s`}
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
        {isOver ? "Auction Ended" : "Auction Ends In"}
      </span>
      <div className="flex items-center gap-2">
        {[
          { label: "Hours", value: remaining.hours },
          { label: "Minutes", value: remaining.minutes },
          { label: "Seconds", value: remaining.seconds },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-14 w-14 flex-col items-center justify-center rounded-2xl transition-colors",
                isUrgent
                  ? "bg-urgent-50 text-urgent-700"
                  : "bg-ink-100 text-ink-900"
              )}
            >
              <span className="text-xl font-bold tabular-nums leading-none">
                {pad(unit.value)}
              </span>
            </div>
            {i < 2 && <span className="text-lg font-medium text-ink-300">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
