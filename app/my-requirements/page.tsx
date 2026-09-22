import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { getCategoryById, myRequirements } from "@/lib/mock-data";
import { unitLabels } from "@/lib/labels";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "My Requirements" };

const statusTone = {
  open: "neutral",
  matching: "accent",
  fulfilled: "brand",
  closed: "neutral",
} as const;

const statusLabel = {
  open: "Open",
  matching: "Matching Suppliers",
  fulfilled: "Fulfilled",
  closed: "Closed",
};

export default function MyRequirementsPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Your Account
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                My Requirements
              </h1>
            </div>
            <Button href="/post-requirement">Post New Requirement</Button>
          </div>

          {myRequirements.length > 0 ? (
            <div className="mt-8 flex flex-col gap-4">
              {myRequirements.map((req) => {
                const category = getCategoryById(req.categoryId);
                return (
                  <div key={req.id} className="rounded-3xl border border-ink-100 bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-ink-900">{req.material}</h3>
                        <p className="mt-1 text-sm text-ink-500">
                          {category?.name} · {formatNumber(req.quantity)} {unitLabels[req.unit]} ·{" "}
                          {req.preferredLocation}
                        </p>
                      </div>
                      <Badge tone={statusTone[req.status]}>{statusLabel[req.status]}</Badge>
                    </div>
                    {req.budget && (
                      <p className="mt-3 text-sm text-ink-600">Budget: {req.budget}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 py-24 text-center">
              <FileText size={32} className="text-ink-300" />
              <h3 className="mt-4 text-lg font-bold text-ink-900">No requirements posted yet</h3>
              <p className="mt-1 max-w-sm text-sm text-ink-500">
                Tell us what material you need and we&apos;ll match you with
                suppliers.
              </p>
              <Button href="/post-requirement" className="mt-5">
                Post Your Requirement
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
