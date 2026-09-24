import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/auth/config";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maalgodaam.com"),
  title: {
    default: "MaalGodaam.com — Quality Surplus Building & Interior Materials",
    template: "%s | MaalGodaam.com",
  },
  description:
    "MaalGodaam.com connects buyers with quality surplus, excess and overstock tiles, furniture, sanitaryware, plywood, flooring and interior materials from trusted suppliers across India. Build more for less.",
  keywords: [
    "surplus building materials",
    "surplus tiles India",
    "surplus plywood",
    "sanitaryware surplus",
    "overstock furniture",
    "interior materials marketplace",
    "excess inventory building materials",
    "pan-India material sourcing",
  ],
  openGraph: {
    title: "MaalGodaam.com — Quality Surplus. Greater Possibilities.",
    description:
      "Premium building & interior materials at exceptional value, sourced from trusted suppliers across India.",
    url: "https://www.maalgodaam.com",
    siteName: "MaalGodaam.com",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/brand/logo-full.jpg", width: 1600, height: 783, alt: "Maalgodaam.com — Surplus माल देगा दाम" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shell = (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-ink-25 font-sans text-ink-900 antialiased">
        <FloatingNavbar />
        <div className="pb-24 lg:pb-0">{children}</div>
        <MobileBottomNav />
      </body>
    </html>
  );

  // ClerkProvider is only mounted when keys are configured (see lib/auth/config.ts).
  return clerkEnabled ? (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/register"
      appearance={{
        variables: { colorPrimary: "#173C8A", colorText: "#1A1713", fontFamily: "var(--font-manrope), system-ui, sans-serif", borderRadius: "0.875rem" },
      }}
    >
      {shell}
    </ClerkProvider>
  ) : (
    shell
  );
}
