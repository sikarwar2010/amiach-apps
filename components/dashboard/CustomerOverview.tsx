"use client";

import Link from "next/link";
import { BadgeCheck, FileText, Heart, MessageSquare, PackageSearch, Receipt, Tag } from "lucide-react";
import { useAppAuth } from "@/lib/auth/client";
import { getCategoryById, listings, myEnquiries, myRequirements } from "@/lib/mock-data";
import { unitLabels } from "@/lib/labels";
import { formatNumber } from "@/lib/utils";
import { MaterialCard } from "@/components/cards/MaterialCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState, Panel, StatCard } from "./ui";

export function CustomerOverview() {
  const { user } = useAppAuth();
  const b2b = user?.accountType === "b2b";
  const recommended = listings.filter((l) => l.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Saved materials" value={3} icon={Heart} />
        <StatCard label="Open requirements" value={myRequirements.length} icon={FileText} hint="Being matched with suppliers" />
        <StatCard label="Enquiries sent" value={myEnquiries.length} icon={MessageSquare} />
        <StatCard label={b2b ? "Quotes awaiting you" : "Orders"} value={b2b ? 1 : 0} icon={b2b ? Receipt : PackageSearch} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="My requirements" action={<Button href="/post-requirement" size="sm">Post new</Button>}>
          {myRequirements.length === 0 ? (
            <EmptyState icon={FileText} title="No requirements yet" text="Tell us what you need and suppliers will respond." action={<Button href="/post-requirement">Post requirement</Button>} />
          ) : (
            <ul className="divide-y divide-ink-100">
              {myRequirements.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink-900">{r.material}</div>
                    <div className="text-xs text-ink-500">
                      {getCategoryById(r.categoryId)?.name} · {formatNumber(r.quantity)} {unitLabels[r.unit]} · {r.preferredLocation}
                    </div>
                  </div>
                  <Badge tone={r.status === "matching" ? "accent" : "neutral"} className="shrink-0 capitalize">{r.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={b2b ? "Business account" : "Your account"}>
          <ul className="flex flex-col gap-3 text-sm text-ink-600">
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-success-600" /> {user?.email || "Email on file"}</li>
            {b2b ? (
              <>
                <li className="flex items-center gap-2"><Tag size={16} className="text-accent-600" /> Bulk pricing & GST invoices enabled</li>
                <li className="text-xs text-ink-400">{user?.company ?? "Add your GSTIN at checkout to receive input-tax-credit invoices."}</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2"><Tag size={16} className="text-accent-600" /> Deals near you are personalised by PIN code</li>
                <li className="text-xs text-ink-400">Upgrade to a business account any time for bulk quotes.</li>
              </>
            )}
          </ul>
          <Link href="/deals" className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">Browse deals near you →</Link>
        </Panel>
      </div>

      <Panel title="Recommended for you" action={<Link href="/catalogue" className="text-sm font-semibold text-brand-700 hover:text-brand-800">View catalogue</Link>}>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {recommended.map((l) => (
            <MaterialCard key={l.id} listing={l} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
