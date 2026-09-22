import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lotwise.com"),
  title: {
    default: "Lotwise — Surplus & Liquidation Inventory Marketplace",
    template: "%s | Lotwise",
  },
  description:
    "Source liquidation, overstock, customer returns and wholesale inventory from verified sellers. Bid or buy bulk lots across 35+ categories on Lotwise, the B2B surplus marketplace.",
  keywords: [
    "liquidation inventory",
    "surplus stock",
    "wholesale pallets",
    "customer returns",
    "overstock marketplace",
    "bulk lots",
    "B2B liquidation",
  ],
  openGraph: {
    title: "Lotwise — Surplus & Liquidation Inventory Marketplace",
    description:
      "Discover quality surplus inventory at exceptional wholesale prices.",
    url: "https://www.lotwise.com",
    siteName: "Lotwise",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-ink-25 font-sans text-ink-900 antialiased">
        <FloatingNavbar />
        <div className="pb-24 lg:pb-0">{children}</div>
        <MobileBottomNav />
      </body>
    </html>
  );
}
