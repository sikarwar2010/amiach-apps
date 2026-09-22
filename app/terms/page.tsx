import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page max-w-3xl pb-24">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-ink-400">Last updated September 2026</p>
          <div className="prose-sm mt-8 flex flex-col gap-6 text-sm leading-relaxed text-ink-600">
            <p>
              These Terms of Service govern access to and use of the Lotwise
              marketplace by buyers and sellers of liquidation, surplus and
              wholesale inventory. This is placeholder legal content for
              design purposes and should be replaced with counsel-reviewed
              terms before launch.
            </p>
            <p>
              By creating an account, you agree to provide accurate business
              information, comply with all applicable trade regulations, and
              honor the terms of any auction or purchase you complete on the
              platform.
            </p>
            <p>
              Lotwise is not a party to transactions between buyers and
              sellers and does not guarantee the condition, quantity or
              value of any listed inventory beyond what is represented in the
              seller's manifest.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
