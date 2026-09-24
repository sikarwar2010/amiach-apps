"use client";

import Link from "next/link";
import { FileText, Heart, LayoutDashboard, LogIn, LogOut, MessageSquare, ShoppingCart, Store, UserPlus } from "lucide-react";
import { useAppAuth } from "@/lib/auth/client";
import { dashboardPathFor, ROLE_LABEL, TYPE_LABEL } from "@/lib/auth/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const SHARED = [
  { label: "Wishlist", description: "Materials you've saved for later.", href: "/wishlist", icon: Heart },
  { label: "Cart", description: "Review items ready for checkout.", href: "/cart", icon: ShoppingCart },
  { label: "My Requirements", description: "Requirements posted to our sourcing network.", href: "/my-requirements", icon: FileText },
  { label: "My Enquiries", description: "Quote and contact requests you've sent.", href: "/my-enquiries", icon: MessageSquare },
];

export function AccountHub() {
  const { isLoaded, isSignedIn, user, signOut } = useAppAuth();

  if (!isLoaded) return <div className="mt-8 h-40 animate-pulse rounded-3xl bg-ink-100" aria-busy="true" />;

  if (!isSignedIn || !user) {
    return (
      <div className="mt-8 rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-soft-xs">
        <h2 className="text-lg font-bold text-ink-900">You&apos;re not signed in</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">Sign in to see your dashboard, saved materials and enquiries — or create a free account.</p>
        <div className="mt-5 flex justify-center gap-2">
          <Button href="/login"><LogIn size={16} /> Sign in</Button>
          <Button href="/register" variant="outline"><UserPlus size={16} /> Register</Button>
        </div>
      </div>
    );
  }

  const dash = dashboardPathFor(user.role);
  const links = user.role === "vendor" ? [{ label: "Sell surplus", description: "List new inventory for review.", href: "/sell-surplus", icon: Store }, ...SHARED.slice(2)] : SHARED;

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-xl font-bold text-white">{user.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <div className="text-lg font-extrabold text-ink-900">{user.name}</div>
            <div className="text-sm text-ink-500">{user.email}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {user.role && <Badge tone="brand">{ROLE_LABEL[user.role]}</Badge>}
              {user.accountType && <Badge tone="outline">{TYPE_LABEL[user.accountType]}</Badge>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button href={dash}><LayoutDashboard size={16} /> {user.role && user.onboarded ? "Open dashboard" : "Finish onboarding"}</Button>
          <Button variant="outline" onClick={() => void signOut()}><LogOut size={16} /> Sign out</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ label, description, href, icon: Icon }) => (
          <Link key={label} href={href} className="flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={20} /></span>
            <div>
              <h3 className="text-base font-bold text-ink-900">{label}</h3>
              <p className="mt-1 text-sm text-ink-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
