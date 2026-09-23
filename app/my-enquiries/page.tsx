import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { getListingById, getSupplierById, myEnquiries } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "My Enquiries" };

const statusTone = {
  pending: "neutral",
  responded: "brand",
  closed: "neutral",
} as const;

const typeLabel = {
  quote: "Quote Request",
  contact: "Contact Supplier",
  bulk: "Bulk Deal",
};

export default function MyEnquiriesPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Your Account
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            My Enquiries
          </h1>

          {myEnquiries.length > 0 ? (
            <div className="mt-8 flex flex-col gap-4">
              {myEnquiries.map((enq) => {
                const listing = getListingById(enq.listingId);
                const supplier = getSupplierById(enq.supplierId);
                if (!listing) return null;
                return (
                  <Link
                    key={enq.id}
                    href={`/product/${listing.slug}`}
                    className="flex flex-wrap items-start justify-between gap-3 rounded-3xl border border-ink-100 bg-white p-5 transition-shadow hover:shadow-soft"
                  >
                    <div>
                      <h3 className="text-base font-bold text-ink-900">{listing.title}</h3>
                      <p className="mt-1 text-sm text-ink-500">
                        {typeLabel[enq.type]} · {supplier?.name}
                      </p>
                      {enq.message && (
                        <p className="mt-2 max-w-md text-sm text-ink-600">{enq.message}</p>
                      )}
                    </div>
                    <Badge tone={statusTone[enq.status]} className="capitalize">
                      {enq.status}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
              <MessageSquare size={32} className="text-ink-300" />
              <h3 className="mt-4 text-lg font-bold text-ink-900">No enquiries yet</h3>
              <p className="mt-1 max-w-sm text-sm text-ink-500">
                Request a quote or contact a supplier from any listing to
                start a conversation.
              </p>
              <Button href="/catalogue" className="mt-5">
                Explore Materials
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
