"use client";

import { useState } from "react";
import { Boxes, Building2, CheckCircle2, FileText } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { conditionLabels } from "@/lib/labels";
import type { ConditionType } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { fieldClass, textareaClass } from "./formStyles";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-ink-700">{children}</label>;
}

function SectionHeader({
  icon: Icon,
  step,
  title,
}: {
  icon: typeof Boxes;
  step: number;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon size={17} />
      </span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-accent-600">
          Step {step}
        </div>
        <h3 className="text-sm font-bold text-ink-900">{title}</h3>
      </div>
    </div>
  );
}

export function SellSurplusForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-success-50 px-6 py-10 text-center">
        <CheckCircle2 size={32} className="text-success-600" />
        <h3 className="mt-3 text-lg font-bold text-success-800">
          Inventory submitted for review
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-success-700">
          Our team typically verifies new listings within 1 business day.
          You&apos;ll be notified once it goes live.
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
        <SectionHeader icon={Building2} step={1} title="Business Details" />
        <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2">
          <div>
            <FieldLabel>Company Name</FieldLabel>
            <input required placeholder="Acme Builders Pvt. Ltd." className={fieldClass} />
          </div>
          <div>
            <FieldLabel>Business Email</FieldLabel>
            <input required type="email" placeholder="you@company.com" className={fieldClass} />
          </div>
        </div>
      </div>

      <div className="h-px bg-ink-100" />

      <div className="flex flex-col gap-4">
        <SectionHeader icon={Boxes} step={2} title="Material Details" />
        <div className="grid grid-cols-1 gap-4 pl-12 sm:grid-cols-2">
          <div>
            <FieldLabel>Material / Category</FieldLabel>
            <select required className={fieldClass}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel>Condition</FieldLabel>
            <select required className={fieldClass}>
              <option value="">Select condition</option>
              {(Object.keys(conditionLabels) as ConditionType[]).map((c) => (
                <option key={c} value={c}>{conditionLabels[c]}</option>
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
          <div className="sm:col-span-2">
            <FieldLabel>Location</FieldLabel>
            <input required placeholder="City, State" className={fieldClass} />
          </div>
        </div>
      </div>

      <div className="h-px bg-ink-100" />

      <div className="flex flex-col gap-4">
        <SectionHeader icon={FileText} step={3} title="Description" />
        <div className="pl-12">
          <FieldLabel>Tell us about your inventory</FieldLabel>
          <textarea
            rows={4}
            placeholder="Brand, batch details, reason for surplus, expected price..."
            className={textareaClass}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-1">
        Submit Inventory <CheckCircle2 size={18} />
      </Button>
    </form>
  );
}
