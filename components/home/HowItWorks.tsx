"use client";

import { useState } from "react";
import {
  Boxes,
  FileSearch,
  Gavel,
  ListChecks,
  PackageCheck,
  Repeat,
  Rocket,
  Tag,
  Truck,
  Upload,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const buyerSteps = [
  { icon: FileSearch, title: "Discover inventory", description: "Search and filter across thousands of active lots by category, location and condition." },
  { icon: ListChecks, title: "Compare lots", description: "Evaluate retail value, savings and seller ratings side by side." },
  { icon: PackageCheck, title: "Inspect manifests", description: "Review SKU-level manifests and condition grading before you commit." },
  { icon: Gavel, title: "Bid or buy", description: "Place a competitive bid or purchase instantly at a fixed price." },
  { icon: Truck, title: "Arrange shipping", description: "Coordinate freight, LTL or parcel delivery directly through the platform." },
  { icon: Repeat, title: "Resell and scale", description: "Move inventory through your channels and reinvest in your next lot." },
];

const sellerSteps = [
  { icon: Upload, title: "List inventory", description: "Create a listing in minutes with our guided lot builder." },
  { icon: Boxes, title: "Upload manifests", description: "Add SKU-level detail and condition grading buyers trust." },
  { icon: Tag, title: "Set pricing", description: "Choose auction, buy-now or request-quote pricing for each lot." },
  { icon: Users, title: "Reach verified buyers", description: "Get discovered by an active network of resellers and retailers." },
  { icon: Rocket, title: "Complete the sale", description: "Manage offers and close transactions with built-in support." },
];

export function HowItWorks() {
  const [tab, setTab] = useState<"buyers" | "sellers">("buyers");
  const steps = tab === "buyers" ? buyerSteps : sellerSteps;

  return (
    <section id="how-it-works" className="scroll-mt-28 py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            How Lotwise Works
          </h2>
          <p className="mt-3 text-ink-500">
            A streamlined path for both sides of the marketplace.
          </p>

          <div className="mx-auto mt-6 inline-flex rounded-full bg-ink-100 p-1">
            {(["buyers", "sellers"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors",
                  tab === key ? "bg-white text-ink-900 shadow-soft-sm" : "text-ink-500"
                )}
              >
                For {key}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-ink-200 lg:block"
          />
          <div
            className={cn(
              "grid grid-cols-1 gap-6 sm:grid-cols-2",
              tab === "buyers" ? "lg:grid-cols-6" : "lg:grid-cols-5"
            )}
          >
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-start">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white shadow-soft-sm">
                  <step.icon size={20} />
                </div>
                <span className="mt-3 text-xs font-semibold text-brand-600">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-sm font-bold text-ink-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
