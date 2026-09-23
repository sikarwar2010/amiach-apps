import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Heart,
  LayoutDashboard,
  LogIn,
  MessageSquare,
  ShoppingCart,
  Store,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "My Account" };

const links = [
  { label: "Buyer Dashboard", description: "Track saved materials, requirements and enquiries.", href: "/dashboard/buyer", icon: LayoutDashboard },
  { label: "Seller Dashboard", description: "Manage your surplus listings and view enquiries.", href: "/dashboard/seller", icon: Store },
  { label: "Wishlist", description: "Materials you've saved for later.", href: "/wishlist", icon: Heart },
  { label: "Cart", description: "Review items ready for checkout.", href: "/cart", icon: ShoppingCart },
  { label: "My Requirements", description: "Requirements posted to our sourcing network.", href: "/my-requirements", icon: FileText },
  { label: "My Enquiries", description: "Quote and contact requests you've sent.", href: "/my-enquiries", icon: MessageSquare },
];

export default function AccountPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Your Account
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            My Account
          </h1>
          <p className="mt-2 max-w-lg text-ink-500">
            Manage your buying and selling activity on MaalGodaam.com in one
            place.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(({ label, description, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{label}</h3>
                  <p className="mt-1 text-sm text-ink-500">{description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-2xl border border-dashed border-ink-200 px-5 py-4 text-sm text-ink-500">
            <LogIn size={16} className="shrink-0 text-ink-400" />
            Not signed in?{" "}
            <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">
              Sign in
            </Link>{" "}
            to sync your activity across devices.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
