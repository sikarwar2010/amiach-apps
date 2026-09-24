"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  FileText,
  FolderTree,
  Heart,
  Inbox,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useAppAuth } from "@/lib/auth/client";
import { dashboardPathFor, ROLE_LABEL, TYPE_LABEL, type UserRole } from "@/lib/auth/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { VerificationBadge } from "./ui";

type NavItem = { label: string; href: string; icon: LucideIcon };

const NAV: Record<UserRole, NavItem[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "Saved", href: "/wishlist", icon: Heart },
    { label: "Requirements", href: "/my-requirements", icon: FileText },
    { label: "Enquiries", href: "/my-enquiries", icon: MessageSquare },
    { label: "Cart", href: "/cart", icon: ShoppingCart },
    { label: "Post requirement", href: "/post-requirement", icon: PlusCircle },
  ],
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
    { label: "Listings", href: "/dashboard/vendor/listings", icon: Boxes },
    { label: "Enquiries", href: "/dashboard/vendor/enquiries", icon: Inbox },
    { label: "New listing", href: "/sell-surplus", icon: PlusCircle },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Accounts", href: "/dashboard/admin/accounts", icon: Users },
    { label: "Categories", href: "/dashboard/admin/categories", icon: FolderTree },
    { label: "Listings", href: "/dashboard/admin/listings", icon: Boxes },
  ],
};

function Gate({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action: React.ReactNode }) {
  return (
    <main className="container-page pb-24 pt-32">
      <div className="mx-auto max-w-md rounded-4xl border border-ink-100 bg-white p-9 text-center shadow-soft-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={24} /></span>
        <h1 className="mt-4 text-xl font-extrabold text-ink-900">{title}</h1>
        <p className="mt-2 text-sm text-ink-500">{text}</p>
        <div className="mt-6 flex justify-center gap-2">{action}</div>
      </div>
    </main>
  );
}

export function DashboardShell({ role, title, subtitle, children }: { role: UserRole; title: string; subtitle?: string; children: React.ReactNode }) {
  const auth = useAppAuth();
  const pathname = usePathname();
  const user = auth.user;

  if (!auth.isLoaded) {
    return (
      <main className="container-page pb-24 pt-32" aria-busy="true">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden h-72 animate-pulse rounded-3xl bg-ink-100 lg:block" />
          <div className="space-y-4">
            <div className="h-24 animate-pulse rounded-3xl bg-ink-100" />
            <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-32 animate-pulse rounded-3xl bg-ink-100" />)}</div>
          </div>
        </div>
      </main>
    );
  }

  if (!auth.isSignedIn || !user) {
    return <Gate icon={LogIn} title="Sign in to continue" text="This area is for registered Maalgodaam.com members." action={<><Button href="/login">Sign in</Button><Button href="/register" variant="outline">Register</Button></>} />;
  }
  if (!user.role || (!user.onboarded && user.role !== "admin")) {
    return <Gate icon={FileText} title="Finish setting up your account" text="Complete onboarding to unlock your dashboard." action={<Button href="/register">Continue onboarding</Button>} />;
  }
  if (user.role !== role) {
    return <Gate icon={ShieldCheck} title="This area isn't available for your account" text={`You're signed in as a ${ROLE_LABEL[user.role]}.`} action={<Button href={dashboardPathFor(user.role)}>Go to my dashboard</Button>} />;
  }

  const items = NAV[role];
  const active = (href: string) => (href === pathname || (href !== `/dashboard/${role}` && pathname.startsWith(href)));

  return (
    <main className="container-page pb-28 pt-28 sm:pt-32">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="hidden rounded-3xl border border-ink-100 bg-white p-4 shadow-soft-xs lg:block">
            <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-ink-900">{user.name}</div>
                <div className="truncate text-xs text-ink-500">{ROLE_LABEL[role]}</div>
              </div>
            </div>
            <nav aria-label="Dashboard" className="mt-3 flex flex-col gap-0.5">
              {items.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={active(href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active(href) ? "bg-brand-50 text-brand-800" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  )}
                >
                  <Icon size={17} /> {label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => void auth.signOut()}
              className="mt-3 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
            >
              <LogOut size={17} /> Sign out
            </button>
          </div>

          <nav aria-label="Dashboard" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar lg:hidden">
            {items.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={active(href) ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium",
                  active(href) ? "border-brand-700 bg-brand-800 text-white" : "border-ink-200 bg-white text-ink-600"
                )}
              >
                <Icon size={15} /> {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{ROLE_LABEL[role]}</Badge>
                {user.accountType && role !== "admin" && <Badge tone="outline">{TYPE_LABEL[user.accountType]}</Badge>}
                {role !== "admin" && <VerificationBadge status={user.verification} />}
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
            </div>
            <button onClick={() => void auth.signOut()} className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink-500 hover:text-ink-800 lg:hidden">
              <LogOut size={15} /> Sign out
            </button>
          </header>
          {children}
        </div>
      </div>
    </main>
  );
}
