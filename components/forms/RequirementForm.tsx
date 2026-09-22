"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock, CheckCircle2, PackageSearch, UserRound } from "lucide-react";
import { categories, locations } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { fieldClass, textareaClass } from "./formStyles";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-ink-700">{children}</label>;
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof PackageSearch;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon size={17} />
      </span>
      <h3 className="text-sm font-bold text-ink-900">{title}</h3>
    </div>
  );
}

export function RequirementForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-success-50 px-6 py-10 text-center">
        <CheckCircle2 size={32} className="text-success-600" />
        <h3 className="mt-3 text-lg font-bold text-success-800">
          Requirement posted
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-success-700">
          Our sourcing network is matching your requirement with suppliers.
          You&apos;ll hear back as matches come in.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <SectionHeader icon={PackageSearch} title="What do you need?" />
        <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel>Material</FieldLabel>
            <input
              required
              defaultValue={searchParams.get("material") ?? ""}
              placeholder="e.g. Vitrified floor tiles"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel>Category</FieldLabel>
            <select defaultValue={searchParams.get("category") ?? ""} className={fieldClass}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Preferred Location</FieldLabel>
            <select className={fieldClass}>
              <option value="">Any location</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>{l.city}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Quantity</FieldLabel>
            <input required type="number" min={0} className={fieldClass} />
          </div>
          <div>
            <FieldLabel>Unit</FieldLabel>
            <select className={fieldClass}>
              <option>sq.ft</option>
              <option>pieces</option>
              <option>boxes</option>
              <option>sets</option>
              <option>sheets</option>
              <option>rolls</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-px bg-ink-100" />

      <div className="flex flex-col gap-4">
        <SectionHeader icon={CalendarClock} title="Budget & Timeline" />
        <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2">
          <div>
            <FieldLabel>Budget (optional)</FieldLabel>
            <input placeholder="e.g. ₹1,00,000 – ₹1,50,000" className={fieldClass} />
          </div>
          <div>
            <FieldLabel>Required By</FieldLabel>
            <input type="date" className={fieldClass + " text-ink-700"} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Additional Requirements</FieldLabel>
            <textarea
              rows={4}
              placeholder="Grade, finish, brand preference, delivery constraints..."
              className={textareaClass}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-ink-100" />

      <div className="flex flex-col gap-4">
        <SectionHeader icon={UserRound} title="Your Contact Details" />
        <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2">
          <div>
            <FieldLabel>Your Name</FieldLabel>
            <input required className={fieldClass} />
          </div>
          <div>
            <FieldLabel>Business Email</FieldLabel>
            <input required type="email" className={fieldClass} />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-1">
        Post Your Requirement <CheckCircle2 size={18} />
      </Button>
    </form>
  );
}
