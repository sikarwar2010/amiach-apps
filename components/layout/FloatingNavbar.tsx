"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Menu,
  MapPin,
  Search,
  ShoppingCart,
  X,
  ChevronDown,
  LayoutGrid,
  Gavel,
  Zap,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { SmartSearch } from "@/components/home/SmartSearch";

const navLinks = [
  { label: "Browse Inventory", href: "/marketplace" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Buyers", href: "/marketplace" },
  { label: "For Sellers", href: "/sell" },
];

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-[1.75rem] border border-white/60 bg-white/80 px-3 backdrop-blur-xl transition-all duration-300 ease-out sm:px-4",
            scrolled ? "h-14 shadow-float" : "h-[4.5rem] shadow-soft"
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 pl-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">
              L
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink-900">
              Lotwise
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900">
                Categories
                <ChevronDown size={14} className={cn("transition-transform", categoriesOpen && "rotate-180")} />
              </button>
              {categoriesOpen && (
                <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-2 gap-1 rounded-3xl border border-ink-100 bg-white p-3 shadow-soft-xl animate-fade-up">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/marketplace?category=${c.slug}`}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <LayoutGrid size={14} className="text-ink-400" />
                          {c.name}
                        </span>
                        <span className="text-xs text-ink-400">
                          {c.listingCount.toLocaleString()}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100"
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Choose location"
              className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 md:flex"
            >
              <MapPin size={16} />
              All Locations
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 sm:flex"
            >
              <Heart size={18} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 sm:flex"
            >
              <ShoppingCart size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-600" />
            </Link>
            <Link
              href="/login"
              className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 lg:inline-flex"
            >
              Sign In
            </Link>
            <Button href="/sell" size="sm" className="hidden lg:inline-flex">
              Get Started
            </Button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <SmartSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {mobileOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
          />
          <div className="fixed inset-y-0 right-0 flex w-[85%] max-w-sm animate-scale-in flex-col bg-white p-5 shadow-soft-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-extrabold text-ink-900">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
              <Link
                href="/marketplace"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-ink-900 hover:bg-ink-50"
              >
                <LayoutGrid size={18} /> Browse Inventory
              </Link>
              <Link
                href="/marketplace?format=auction"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-ink-900 hover:bg-ink-50"
              >
                <Gavel size={18} /> Auctions
              </Link>
              <Link
                href="/marketplace?format=buy-now"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-ink-900 hover:bg-ink-50"
              >
                <Zap size={18} /> Buy Now Deals
              </Link>
              <Link
                href="/sellers"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-ink-900 hover:bg-ink-50"
              >
                <Star size={18} /> Trusted Sellers
              </Link>

              <div className="my-3 h-px bg-ink-100" />

              <div className="px-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Categories
              </div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                {categories.slice(0, 8).map((c) => (
                  <Link
                    key={c.id}
                    href={`/marketplace?category=${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-4">
              <Button href="/sell" onClick={() => setMobileOpen(false)}>
                Get Started
              </Button>
              <Button href="/login" variant="outline" onClick={() => setMobileOpen(false)}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
