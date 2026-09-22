import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Heart, MessageSquare, PackageSearch } from "lucide-react";
import { myEnquiries, myRequirements } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Buyer Dashboard" };

const tiles = [
  { label: "Saved Products", href: "/wishlist", icon: Heart, count: 3 },
  { label: "My Requirements", href: "/my-requirements", icon: FileText, count: myRequirements.length },
  { label: "My Enquiries", href: "/my-enquiries", icon: MessageSquare, count: myEnquiries.length },
];

export default function BuyerDashboardPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Buyer Dashboard
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-ink-500">
            Track your saved materials, requirements and supplier enquiries.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {tiles.map(({ label, href, icon: Icon, count }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="text-2xl font-extrabold text-ink-900">{count}</div>
                  <div className="text-sm text-ink-500">{label}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-ink-200 py-16 text-center">
            <PackageSearch size={28} className="text-ink-300" />
            <h3 className="mt-3 text-base font-bold text-ink-900">
              Need something specific?
            </h3>
            <p className="mt-1 max-w-sm text-sm text-ink-500">
              Post a requirement and let our sourcing network match you with
              suppliers.
            </p>
            <Button href="/post-requirement" className="mt-4">
              Post Your Requirement
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
