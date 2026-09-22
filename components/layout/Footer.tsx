import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { WarehouseMark } from "@/components/brand/WarehouseMark";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Explore Materials", href: "/materials" },
      { label: "Categories", href: "/materials" },
      { label: "Featured Deals", href: "/materials?featured=true" },
      { label: "Supplier Directory", href: "/suppliers" },
    ],
  },
  {
    title: "For Buyers",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Post Requirement", href: "/post-requirement" },
      { label: "Buyer FAQ", href: "/faq" },
      { label: "Support", href: "/contact" },
    ],
  },
  {
    title: "For Sellers",
    links: [
      { label: "Sell Your Surplus", href: "/sell-surplus" },
      { label: "How Selling Works", href: "/how-it-works" },
      { label: "Seller FAQ", href: "/faq" },
      { label: "Seller Dashboard", href: "/dashboard/seller" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About MaalGodaam", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-white pb-28 pt-16 lg:pb-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <WarehouseMark size={34} className="shrink-0 text-brand-800" />
              <span className="text-lg font-extrabold tracking-tight text-ink-900">
                MaalGodaam<span className="text-accent-600">.com</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              India&apos;s marketplace for quality surplus building and interior
              materials — connecting buyers with trusted suppliers. Build more
              for less.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-ink-600">
              <span className="inline-flex items-center gap-2">
                <Mail size={15} className="text-ink-400" /> partners@maalgodaam.com
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={15} className="text-ink-400" /> +91 98765 43210
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-ink-400" /> Gurugram, Haryana — HQ
              </span>
            </div>
            <div className="mt-5 flex gap-2">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-brand-800 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-ink-900">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} MaalGodaam.com. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-ink-400">
            <Link href="/terms" className="hover:text-ink-700">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-ink-700">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-ink-700">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
