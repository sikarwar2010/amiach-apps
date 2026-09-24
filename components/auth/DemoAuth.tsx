"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, ShieldCheck, Store, UserRound, Users } from "lucide-react";
import { newDemoUser, writeDemoUser } from "@/lib/auth/demo-store";
import { dashboardPathFor, type AccountType, type AppUser, type UserRole } from "@/lib/auth/types";
import { Button } from "@/components/ui/Button";
import { fieldClass } from "@/components/forms/formStyles";

const QUICK: { label: string; hint: string; icon: typeof Users; user: Partial<AppUser> & { email: string; name: string } }[] = [
  { label: "Customer · Individual", hint: "B2C homeowner", icon: UserRound, user: { name: "Aarav Sharma", email: "aarav@example.com", role: "customer", accountType: "b2c", onboarded: true, verification: "verified" } },
  { label: "Customer · Business", hint: "B2B contractor", icon: Building2, user: { name: "Riya Kapoor", email: "riya@kapoorbuilders.example", role: "customer", accountType: "b2b", onboarded: true, verification: "verified", company: "Kapoor Builders Pvt. Ltd." } },
  { label: "Vendor · verified", hint: "B2B supplier", icon: Store, user: { name: "Manish Gupta", email: "manish@shreeji.example", role: "vendor", accountType: "b2b", onboarded: true, verification: "verified", company: "Shreeji Tile Distributors" } },
  { label: "Vendor · pending review", hint: "KYC in progress", icon: Store, user: { name: "Neha Verma", email: "neha@urbannest.example", role: "vendor", accountType: "b2b", onboarded: true, verification: "pending", company: "Urban Nest Furniture" } },
  { label: "Company Admin", hint: "Full console", icon: ShieldCheck, user: { name: "MaalGodaam Admin", email: "admin@maalgodaam.com", role: "admin", accountType: "b2b", onboarded: true, verification: "verified", company: "MaalGodaam.com" } },
];

export function DemoSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="rounded-4xl border border-ink-100 bg-white p-7 shadow-soft-sm sm:p-9">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-500">Sign in to manage your buying or selling on Maalgodaam.com.</p>

      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-ink-500">Explore with a demo account</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {QUICK.map(({ label, hint, icon: Icon, user }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              writeDemoUser(newDemoUser(user));
              router.push(dashboardPathFor(user.role));
            }}
            className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon size={17} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink-900">{label}</span>
              <span className="block truncate text-xs text-ink-500">{hint}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
        <span className="h-px flex-1 bg-ink-100" /> or start a new account <span className="h-px flex-1 bg-ink-100" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          writeDemoUser(newDemoUser({ email: email.trim(), name: email.split("@")[0] }));
          router.push("/register");
        }}
      >
        <label htmlFor="demo-email" className="text-xs font-semibold text-ink-700">Email</label>
        <input
          id="demo-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={fieldClass}
        />
        <Button type="submit" size="lg" className="mt-4 w-full">Continue</Button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-500">
        New here?{" "}
        <Link href="/register" className="font-semibold text-brand-700 hover:text-brand-800">Create an account</Link>
      </p>
    </div>
  );
}

export function DemoSignUp({ role, type }: { role: Exclude<UserRole, "admin">; type: AccountType }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form
      className="rounded-4xl border border-ink-100 bg-white p-7 shadow-soft-sm sm:p-9"
      onSubmit={(e) => {
        e.preventDefault();
        writeDemoUser(newDemoUser({ name: name.trim(), email: email.trim(), role, accountType: type }));
        router.push(`/onboarding/${role}/${type}`);
      }}
    >
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Create your account</h1>
      <p className="mt-1.5 text-sm text-ink-500">Step 1 of 2 — then we&apos;ll collect your {role === "vendor" ? "business" : "buying"} details.</p>
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="su-name" className="text-xs font-semibold text-ink-700">Full name</label>
          <input id="su-name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="su-email" className="text-xs font-semibold text-ink-700">Email</label>
          <input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
        </div>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full">Continue</Button>
      <p className="mt-5 text-center text-sm text-ink-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-800">Sign in</Link>
      </p>
    </form>
  );
}
