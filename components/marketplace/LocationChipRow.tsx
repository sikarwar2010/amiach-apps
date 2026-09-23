import Link from "next/link";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function LocationChipRow({ activeLocationId }: { activeLocationId?: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <Link
        href="/deals"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
          !activeLocationId
            ? "border-brand-700 bg-brand-800 text-white"
            : "border-ink-200 text-ink-600 hover:border-brand-300 hover:bg-brand-50"
        )}
      >
        <MapPin size={14} /> All Locations
      </Link>
      {locations.map((l) => (
        <Link
          key={l.id}
          href={`/deals/${l.id}`}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
            activeLocationId === l.id
              ? "border-brand-700 bg-brand-800 text-white"
              : "border-ink-200 text-ink-600 hover:border-brand-300 hover:bg-brand-50"
          )}
        >
          {l.city}
        </Link>
      ))}
    </div>
  );
}
