import {
  BadgeCheck,
  FileText,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Truck,
} from "lucide-react";

const points = [
  {
    icon: BadgeCheck,
    title: "Verified Sellers",
    description:
      "Every seller completes a business verification review before listing inventory.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Payments and buyer information are protected with enterprise-grade encryption.",
  },
  {
    icon: FileText,
    title: "Transparent Manifests",
    description:
      "Detailed SKU-level manifests give you clarity on what you're actually buying.",
  },
  {
    icon: Truck,
    title: "Shipping Support",
    description:
      "Freight, LTL and parcel options with coordinated logistics on every lot.",
  },
  {
    icon: MessageSquareText,
    title: "Business Support",
    description:
      "A dedicated team to help you evaluate lots, negotiate and resolve issues.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    description:
      "Listings that don't match their manifest are eligible for resolution support.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Built for Trust at Every Step
          </h2>
          <p className="mt-3 text-ink-500">
            Sourcing bulk inventory is a serious commitment. Here's how we
            protect it.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-ink-100 bg-white p-6 transition-shadow duration-300 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
