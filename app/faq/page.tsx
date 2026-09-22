import type { Metadata } from "next";
import { AccordionSection } from "@/components/ui/Accordion";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { q: "How does bidding work on auction lots?", a: "Place a bid at or above the minimum increment. If you're outbid, you'll be notified so you can respond before the auction closes." },
  { q: "What does each condition grade mean?", a: "Grades range from New to Customer Returns. Every listing includes condition notes describing cosmetic and functional expectations." },
  { q: "How is shipping handled?", a: "Sellers list available shipping methods — freight, LTL, parcel or local pickup — and coordinate logistics directly after purchase." },
  { q: "Can I request a quote on large lots?", a: "Yes. Lots marked 'Request Quote' let you submit your target volume and pricing directly to the seller." },
  { q: "How are sellers verified?", a: "Every seller completes a business verification review, including manifest accuracy checks, before they can list inventory." },
];

export default function FaqPage() {
  return (
    <>
      <main className="pt-28 sm:pt-32">
        <div className="container-page pb-24">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Support
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Frequently Asked Questions
          </h1>

          <div className="mt-8 max-w-2xl rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
            {faqs.map((f) => (
              <AccordionSection key={f.q} title={f.q} defaultOpen={false}>
                <p className="text-sm leading-relaxed text-ink-600">{f.a}</p>
              </AccordionSection>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
