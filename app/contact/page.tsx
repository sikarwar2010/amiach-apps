import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AuthField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Contact
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Get in Touch
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <form className="rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AuthField label="Full Name" placeholder="Jordan Ellis" />
                <AuthField label="Business Email" type="email" placeholder="you@company.com" />
              </div>
              <div className="mt-4">
                <label className="text-xs font-medium text-ink-600">Message</label>
                <textarea
                  rows={5}
                  className="mt-1.5 w-full rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                  placeholder="How can we help?"
                />
              </div>
              <Button type="submit" size="lg" className="mt-5">
                Send Message
              </Button>
            </form>

            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: "Email", value: "partners@lotwise.com" },
                { icon: Phone, label: "Phone", value: "+1 (800) 555-0142" },
                { icon: MapPin, label: "Headquarters", value: "Dallas, TX" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon size={17} />
                  </span>
                  <div>
                    <div className="text-xs text-ink-500">{label}</div>
                    <div className="text-sm font-semibold text-ink-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
