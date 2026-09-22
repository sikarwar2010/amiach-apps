import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse Inventory", href: "/marketplace" },
      { label: "Categories", href: "/marketplace" },
      { label: "Auctions", href: "/marketplace?format=auction" },
      { label: "Buy Now", href: "/marketplace?format=buy-now" },
      { label: "Featured Deals", href: "/marketplace?featured=true" },
    ],
  },
  {
    title: "For Buyers",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Buyer FAQ", href: "/faq" },
      { label: "Buying Guide", href: "/faq" },
      { label: "Shipping", href: "/faq" },
      { label: "Support", href: "/contact" },
    ],
  },
  {
    title: "For Sellers",
    links: [
      { label: "Sell Inventory", href: "/sell" },
      { label: "Seller Guide", href: "/sell" },
      { label: "Seller FAQ", href: "/faq" },
      { label: "List Inventory", href: "/sell" },
      { label: "Seller Resources", href: "/sell" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
      { label: "Blog", href: "/about" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
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
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">
                L
              </span>
              <span className="text-lg font-extrabold tracking-tight text-ink-900">
                Lotwise
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              The B2B marketplace connecting verified sellers of surplus, liquidation
              and overstock inventory with buyers ready to scale.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-ink-600">
              <span className="inline-flex items-center gap-2">
                <Mail size={15} className="text-ink-400" /> partners@lotwise.com
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone size={15} className="text-ink-400" /> +1 (800) 555-0142
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-ink-400" /> Dallas, TX — HQ
              </span>
            </div>
            <div className="mt-5 flex gap-2">
              {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-900 hover:text-white"
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
                      className="text-sm text-ink-500 transition-colors hover:text-brand-600"
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
            © {new Date().getFullYear()} Lotwise, Inc. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-ink-400">
            <Link href="/terms" className="hover:text-ink-700">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-ink-700">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-ink-700">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
