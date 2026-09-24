"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Boxes, CheckCircle2, Clock, Eye, Inbox, MessageSquare, PlusCircle, TrendingUp } from "lucide-react";
import { useAppAuth } from "@/lib/auth/client";
import { vendorEnquiries, vendorListings, type ListingStatus } from "@/lib/dashboard-data";
import { getCategoryById } from "@/lib/mock-data";
import { unitLabels } from "@/lib/labels";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState, Panel, StatCard, TableWrap, td, th } from "./ui";

const STATUS_TONE: Record<ListingStatus, "success" | "accent" | "neutral" | "dark"> = { live: "success", pending: "accent", draft: "neutral", rejected: "dark" };
const STATUS_LABEL: Record<ListingStatus, string> = { live: "Live", pending: "In review", draft: "Draft", rejected: "Rejected" };

function VerificationBanner() {
  const { user } = useAppAuth();
  if (!user || user.verification === "verified") return null;
  const rejected = user.verification === "rejected";
  return (
    <div role="status" className={cn("mb-6 flex items-start gap-3 rounded-3xl border p-5", rejected ? "border-danger-500/30 bg-danger-50" : "border-accent-200 bg-accent-50")}>
      {rejected ? <AlertTriangle className="mt-0.5 shrink-0 text-danger-600" size={20} /> : <Clock className="mt-0.5 shrink-0 text-accent-600" size={20} />}
      <div className="text-sm">
        <div className="font-bold text-ink-900">{rejected ? "Verification needs attention" : "Verification in progress"}</div>
        <p className="mt-0.5 text-ink-600">
          {rejected
            ? "We couldn't verify your documents. Contact support to resubmit — listings stay hidden until verified."
            : "Our team is reviewing your documents (usually 1–2 business days). You can draft listings now; they publish once you're verified."}
        </p>
        {rejected && <Link href="/contact" className="mt-2 inline-block font-semibold text-brand-700">Contact support →</Link>}
      </div>
    </div>
  );
}

function ListingsTable({ rows }: { rows: typeof vendorListings }) {
  return (
    <TableWrap>
      <thead>
        <tr className="border-b border-ink-100">
          <th className={th}>Listing</th><th className={th}>Category</th><th className={th}>Qty</th><th className={th}>Price</th><th className={th}>Views</th><th className={th}>Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-ink-100">
        {rows.map((l) => (
          <tr key={l.id}>
            <td className={cn(td, "max-w-[220px] truncate font-semibold text-ink-900")}>
              <Link href={`/product/${l.slug}`} className="hover:text-brand-700">{l.title}</Link>
            </td>
            <td className={td}>{getCategoryById(l.categoryId)?.name}</td>
            <td className={td}>{formatNumber(l.quantity)} {unitLabels[l.unit as keyof typeof unitLabels] ?? l.unit}</td>
            <td className={td}>{formatCurrency(l.price)}</td>
            <td className={td}>{l.views}</td>
            <td className={td}><Badge tone={STATUS_TONE[l.status]}>{STATUS_LABEL[l.status]}</Badge></td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

export function VendorOverview() {
  const { user } = useAppAuth();
  const verified = user?.verification === "verified";
  const live = vendorListings.filter((l) => l.status === "live").length;

  const checklist = [
    { done: true, label: "Account created" },
    { done: true, label: "Business profile submitted" },
    { done: verified, label: verified ? "Documents verified" : "Documents under review" },
    { done: live > 0 && verified, label: "First listing live" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <VerificationBanner />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active listings" value={live} icon={Boxes} trend={{ value: "+2 this week", up: true }} />
        <StatCard label="New enquiries" value={vendorEnquiries.filter((e) => e.status === "new").length} icon={Inbox} />
        <StatCard label="Listing views (30d)" value="1,284" icon={Eye} trend={{ value: "12%", up: true }} />
        <StatCard label="Enquiry → quote rate" value="38%" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Recent listings" action={<Button href="/dashboard/vendor/listings" size="sm" variant="outline">View all</Button>}>
          <ListingsTable rows={vendorListings.slice(0, 5)} />
        </Panel>
        <div className="flex flex-col gap-6">
          <Panel title="Getting started">
            <ol className="flex flex-col gap-3">
              {checklist.map((c) => (
                <li key={c.label} className="flex items-center gap-2.5 text-sm">
                  {c.done ? <CheckCircle2 size={18} className="text-success-600" /> : <Clock size={18} className="text-ink-300" />}
                  <span className={c.done ? "text-ink-700" : "text-ink-400"}>{c.label}</span>
                </li>
              ))}
            </ol>
            <Button href="/sell-surplus" className="mt-5 w-full"><PlusCircle size={16} /> List surplus</Button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export function VendorListingsView() {
  const [filter, setFilter] = useState<ListingStatus | "all">("all");
  const rows = filter === "all" ? vendorListings : vendorListings.filter((l) => l.status === filter);
  return (
    <div className="flex flex-col gap-6">
      <VerificationBanner />
      <Panel title={`${rows.length} listing${rows.length === 1 ? "" : "s"}`} action={<Button href="/sell-surplus" size="sm"><PlusCircle size={15} /> New listing</Button>}>
        <div role="group" aria-label="Filter by status" className="-mt-1 mb-4 flex flex-wrap gap-2">
          {(["all", "live", "pending", "draft", "rejected"] as const).map((s) => (
            <button
              key={s}
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
              className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors", filter === s ? "border-brand-700 bg-brand-800 text-white" : "border-ink-200 text-ink-600 hover:border-ink-300")}
            >
              {s === "pending" ? "In review" : s}
            </button>
          ))}
        </div>
        {rows.length ? <ListingsTable rows={rows} /> : <EmptyState icon={Boxes} title="Nothing here" text="No listings match this filter." />}
      </Panel>
    </div>
  );
}

export function VendorEnquiriesView() {
  const [items, setItems] = useState(vendorEnquiries);
  return (
    <div className="flex flex-col gap-6">
      <VerificationBanner />
      <Panel title="Enquiry inbox">
        {items.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No enquiries yet" text="Buyer quotes and bulk deal requests will appear here." />
        ) : (
          <ul className="divide-y divide-ink-100">
            {items.map((e) => (
              <li key={e.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-ink-900">{e.buyer}</span>
                    <Badge tone="outline">{e.buyerType}</Badge>
                    <Badge tone="brand">{e.type}</Badge>
                    {e.status === "new" && <Badge tone="accent">New</Badge>}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-500">{e.listingTitle} · {e.quantity} · {e.when}</div>
                  <p className="mt-2 text-sm text-ink-600">{e.message}</p>
                </div>
                <Button
                  size="sm"
                  variant={e.status === "new" ? "primary" : "outline"}
                  disabled={e.status === "responded"}
                  onClick={() => setItems((all) => all.map((x) => (x.id === e.id ? { ...x, status: "responded" } : x)))}
                >
                  {e.status === "new" ? "Mark responded" : "Responded"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
