import type { Metadata } from "next";
import { AccountHub } from "@/components/account/AccountHub";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "My Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Your Account</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">My Account</h1>
          <p className="mt-2 max-w-lg text-ink-500">Manage your buying and selling activity on Maalgodaam.com in one place.</p>
          <AccountHub />
        </div>
      </main>
      <Footer />
    </>
  );
}
