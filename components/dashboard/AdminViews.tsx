"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, Boxes, Check, ClipboardCheck, FolderTree, Plus, Search, Trash2, Users, X, Zap } from "lucide-react";
import { useAdminAccounts } from "@/lib/services/adminService";
import { createCategory, removeCategory, useAllCategories } from "@/lib/services/categoryService";
import { categories as builtInCategories, listings } from "@/lib/mock-data";
import { slugify, formatCurrency, cn } from "@/lib/utils";
import type { VerificationStatus } from "@/lib/auth/types";
import type { Category } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fieldClass, textareaClass } from "@/components/forms/formStyles";
import { EmptyState, Panel, StatCard, TableWrap, VerificationBadge, td, th } from "./ui";

function AccountActions({ id, status, onSet }: { id: string; status: VerificationStatus; onSet: (id: string, s: VerificationStatus) => void }) {
  if (status === "verified")
    return <Button size="sm" variant="ghost" onClick={() => onSet(id, "pending")}>Revoke</Button>;
  return (
    <div className="flex gap-1.5">
      <Button size="sm" onClick={() => onSet(id, "verified")} aria-label="Approve"><Check size={15} /> Approve</Button>
      {status !== "rejected" && <Button size="sm" variant="outline" onClick={() => onSet(id, "rejected")} aria-label="Reject"><X size={15} /></Button>}
    </div>
  );
}

export function AdminOverview() {
  const { rows, loading, error, setStatus } = useAdminAccounts();
  const pending = rows.filter((r) => r.verification === "pending");
  const vendors = rows.filter((r) => r.role === "vendor").length;
  const customers = rows.filter((r) => r.role === "customer").length;

  return (
    <div className="flex flex-col gap-6">
      {error && <p role="alert" className="flex items-center gap-2 rounded-2xl bg-danger-50 px-4 py-3 text-sm text-danger-600"><AlertCircle size={16} /> {error}</p>}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pending verifications" value={loading ? "—" : pending.length} icon={ClipboardCheck} hint="Vendors & business buyers" />
        <StatCard label="Vendors" value={loading ? "—" : vendors} icon={Users} />
        <StatCard label="Customers" value={loading ? "—" : customers} icon={Users} />
        <StatCard label="Listings awaiting review" value={listings.slice(0, 3).length} icon={Boxes} />
      </div>
      <Panel title="Verification queue" action={<Button href="/dashboard/admin/accounts" size="sm" variant="outline">All accounts</Button>}>
        {loading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-ink-100" />
        ) : pending.length === 0 ? (
          <EmptyState icon={ClipboardCheck} title="Queue is clear" text="New vendor and business-buyer submissions will appear here." />
        ) : (
          <TableWrap>
            <thead><tr className="border-b border-ink-100"><th className={th}>Account</th><th className={th}>Role</th><th className={th}>Type</th><th className={th}>Action</th></tr></thead>
            <tbody className="divide-y divide-ink-100">
              {pending.slice(0, 5).map((r) => (
                <tr key={r.id}>
                  <td className={td}><div className="font-semibold text-ink-900">{r.company ?? r.name}</div><div className="text-xs text-ink-500">{r.email}</div></td>
                  <td className={cn(td, "capitalize")}>{r.role}</td>
                  <td className={cn(td, "uppercase")}>{r.accountType}</td>
                  <td className={td}><AccountActions id={r.id} status={r.verification} onSet={setStatus} /></td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Panel>
    </div>
  );
}

export function AdminAccounts() {
  const { rows, loading, error, setStatus } = useAdminAccounts();
  const [role, setRole] = useState("all");
  const [status, setStatusFilter] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (role === "all" || r.role === role) &&
          (status === "all" || r.verification === status) &&
          (!q || `${r.name} ${r.email} ${r.company ?? ""}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [rows, role, status, q]
  );

  return (
    <Panel title={`${filtered.length} account${filtered.length === 1 ? "" : "s"}`}>
      {error && <p role="alert" className="mb-4 rounded-2xl bg-danger-50 px-4 py-3 text-sm text-danger-600">{error}</p>}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search accounts</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, company" className={cn(fieldClass, "mt-0 h-11 pl-10")} />
        </label>
        <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)} className={cn(fieldClass, "mt-0 h-11 sm:w-40")}>
          <option value="all">All roles</option><option value="vendor">Vendors</option><option value="customer">Customers</option>
        </select>
        <select aria-label="Verification" value={status} onChange={(e) => setStatusFilter(e.target.value)} className={cn(fieldClass, "mt-0 h-11 sm:w-44")}>
          <option value="all">All statuses</option><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option><option value="unverified">Unverified</option>
        </select>
      </div>
      {loading ? (
        <div className="h-48 animate-pulse rounded-2xl bg-ink-100" />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title="No accounts found" text="Try clearing the filters." />
      ) : (
        <TableWrap>
          <thead><tr className="border-b border-ink-100"><th className={th}>Account</th><th className={th}>Role</th><th className={th}>Type</th><th className={th}>Status</th><th className={th}>Action</th></tr></thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className={td}><div className="font-semibold text-ink-900">{r.company ?? r.name}</div><div className="text-xs text-ink-500">{r.name} · {r.email}</div></td>
                <td className={cn(td, "capitalize")}>{r.role}</td>
                <td className={cn(td, "uppercase")}>{r.accountType}</td>
                <td className={td}><VerificationBadge status={r.verification} /></td>
                <td className={td}><AccountActions id={r.id} status={r.verification} onSet={setStatus} /></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </Panel>
  );
}

const ELECTRONICS_TEMPLATE = {
  name: "Electronics & Electricals",
  descriptor: "Wiring, switchgear, fans and smart fittings.",
  subcategories: "Switches & Sockets, MCBs & Distribution Boards, Wires & Cables, Fans & Ventilation, LED Drivers & Controls, Smart Home Devices, Water Heaters & Geysers, CCTV & Security",
  specFields: "Brand, Model number, Voltage / rating, Warranty remaining, Certification (ISI / BIS), Working condition",
};

const splitList = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

export function AdminCategories() {
  const all = useAllCategories();
  const builtInIds = new Set(builtInCategories.map((c) => c.id));

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [descriptor, setDescriptor] = useState("");
  const [image, setImage] = useState("");
  const [subs, setSubs] = useState("");
  const [specs, setSpecs] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const applyTemplate = () => {
    setName(ELECTRONICS_TEMPLATE.name);
    setSlug(slugify("Electronics Electricals"));
    setSlugTouched(true);
    setDescriptor(ELECTRONICS_TEMPLATE.descriptor);
    setSubs(ELECTRONICS_TEMPLATE.subcategories);
    setSpecs(ELECTRONICS_TEMPLATE.specFields);
    setMsg(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug || slugify(name);
    if (!name.trim() || !finalSlug) return setMsg({ ok: false, text: "Category name is required." });
    const cat: Category = {
      id: finalSlug,
      slug: finalSlug,
      name: name.trim(),
      descriptor: descriptor.trim() || "New category",
      listingCount: 0,
      imageUrl: image.trim() || builtInCategories[0].imageUrl,
      subcategories: splitList(subs),
      specFields: splitList(specs),
    };
    const res = createCategory(cat);
    if (!res.ok) return setMsg({ ok: false, text: res.error });
    setMsg({ ok: true, text: `“${cat.name}” created. Vendors can now list under it.` });
    setName(""); setSlug(""); setSlugTouched(false); setDescriptor(""); setImage(""); setSubs(""); setSpecs("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <Panel title="Create category" action={<Button type="button" size="sm" variant="outline" onClick={applyTemplate}><Zap size={14} /> Electronics template</Button>}>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="cat-name" className="text-xs font-semibold text-ink-700">Category name *</label>
            <input id="cat-name" required value={name} onChange={(e) => { setName(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} className={fieldClass} placeholder="e.g. Electronics & Electricals" />
          </div>
          <div>
            <label htmlFor="cat-slug" className="text-xs font-semibold text-ink-700">URL slug</label>
            <input id="cat-slug" value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }} className={fieldClass} />
            <p className="mt-1 text-xs text-ink-400">Used at /catalogue/{slug || "your-slug"}</p>
          </div>
          <div>
            <label htmlFor="cat-desc" className="text-xs font-semibold text-ink-700">Tagline</label>
            <input id="cat-desc" value={descriptor} onChange={(e) => setDescriptor(e.target.value)} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="cat-img" className="text-xs font-semibold text-ink-700">Cover image URL</label>
            <input id="cat-img" type="url" value={image} onChange={(e) => setImage(e.target.value)} className={fieldClass} placeholder="https://…" />
          </div>
          <div>
            <label htmlFor="cat-subs" className="text-xs font-semibold text-ink-700">Subcategories</label>
            <textarea id="cat-subs" rows={2} value={subs} onChange={(e) => setSubs(e.target.value)} className={textareaClass} placeholder="Comma-separated" />
          </div>
          <div>
            <label htmlFor="cat-specs" className="text-xs font-semibold text-ink-700">Listing attributes (spec fields)</label>
            <textarea id="cat-specs" rows={2} value={specs} onChange={(e) => setSpecs(e.target.value)} className={textareaClass} placeholder="Comma-separated, e.g. Voltage, Warranty" />
          </div>
          {msg && <p role={msg.ok ? "status" : "alert"} className={cn("rounded-xl px-3.5 py-2.5 text-sm font-medium", msg.ok ? "bg-success-50 text-success-700" : "bg-danger-50 text-danger-600")}>{msg.text}</p>}
          <Button type="submit" size="lg"><Plus size={17} /> Create category</Button>
        </form>
      </Panel>

      <Panel title={`Categories (${all.length})`}>
        <ul className="divide-y divide-ink-100">
          {all.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                <Image src={c.imageUrl} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/catalogue/${c.slug}`} className="truncate text-sm font-bold text-ink-900 hover:text-brand-700">{c.name}</Link>
                  {!builtInIds.has(c.id) && <Badge tone="accent">Custom</Badge>}
                </div>
                <div className="truncate text-xs text-ink-500">
                  {c.subcategories?.length ? `${c.subcategories.length} subcategories` : c.descriptor}
                </div>
              </div>
              {!builtInIds.has(c.id) && (
                <button aria-label={`Delete ${c.name}`} onClick={() => removeCategory(c.id)} className="rounded-full p-2 text-ink-400 hover:bg-danger-50 hover:text-danger-600">
                  <Trash2 size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-2 text-xs text-ink-400">
          <FolderTree size={14} className="mt-0.5 shrink-0" />
          Custom categories are stored in this browser until the catalogue API is connected (see lib/services/categoryService.ts).
        </p>
      </Panel>
    </div>
  );
}

export function AdminListings() {
  const [state, setState] = useState<Record<string, "approved" | "rejected">>({});
  const queue = listings.slice(0, 6);
  return (
    <Panel title="Listing moderation">
      <TableWrap>
        <thead><tr className="border-b border-ink-100"><th className={th}>Listing</th><th className={th}>Price</th><th className={th}>Condition</th><th className={th}>Decision</th></tr></thead>
        <tbody className="divide-y divide-ink-100">
          {queue.map((l) => {
            const d = state[l.id];
            return (
              <tr key={l.id}>
                <td className={cn(td, "font-semibold text-ink-900")}><Link href={`/product/${l.slug}`} className="hover:text-brand-700">{l.title}</Link></td>
                <td className={td}>{formatCurrency(l.price)}</td>
                <td className={cn(td, "capitalize")}>{l.condition.replace("-", " ")}</td>
                <td className={td}>
                  {d ? (
                    <Badge tone={d === "approved" ? "success" : "dark"}>{d === "approved" ? "Approved" : "Rejected"}</Badge>
                  ) : (
                    <div className="flex gap-1.5">
                      <Button size="sm" onClick={() => setState((s) => ({ ...s, [l.id]: "approved" }))}><Check size={15} /> Approve</Button>
                      <Button size="sm" variant="outline" aria-label="Reject" onClick={() => setState((s) => ({ ...s, [l.id]: "rejected" }))}><X size={15} /></Button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
    </Panel>
  );
}
