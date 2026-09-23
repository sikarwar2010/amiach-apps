import Link from "next/link";
import { FileText, Handshake, LayoutGrid, MapPinned, Workflow } from "lucide-react";

const actions = [
  { label: "Explore Catalogue", href: "/catalogue", icon: LayoutGrid },
  { label: "Deals Around You", href: "/deals", icon: MapPinned },
  { label: "Sell Surplus", href: "/sell-surplus", icon: Handshake },
  { label: "Post Requirement", href: "/post-requirement", icon: FileText },
  { label: "How It Works", href: "/how-it-works", icon: Workflow },
];

export function QuickActions() {
  return (
    <section className="py-4 sm:py-6">
      <div className="container-page">
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {actions.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 py-3.5 shadow-soft-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft sm:shrink"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-800 group-hover:text-white">
                <Icon size={18} />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold text-ink-900">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
