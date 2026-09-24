"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Clock, Loader2, ShieldCheck } from "lucide-react";
import { useAppAuth } from "@/lib/auth/client";
import { clerkEnabled } from "@/lib/auth/config";
import { newDemoUser, writeDemoUser } from "@/lib/auth/demo-store";
import { stepsFor, validateField, type OnboardingValues } from "@/lib/auth/onboarding-schema";
import { dashboardPathFor, TYPE_LABEL, type AccountType, type UserRole, type VerificationStatus } from "@/lib/auth/types";
import { useAllCategories } from "@/lib/services/categoryService";
import { completeOnboarding } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FieldControl } from "./FieldControl";

type R = Exclude<UserRole, "admin">;

export function OnboardingWizard({ role, type }: { role: R; type: AccountType }) {
  const router = useRouter();
  const auth = useAppAuth();
  const categories = useAllCategories();
  const steps = useMemo(() => stepsFor(role, type), [role, type]);

  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<OnboardingValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState<VerificationStatus | null>(null);
  const prefilled = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefilled.current || !auth.user) return;
    prefilled.current = true;
    setValues((v) => ({ contactName: auth.user!.name, email: auth.user!.email, ...v }));
  }, [auth.user]);

  useEffect(() => headingRef.current?.focus(), [index, done]);

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const roleWord = role === "vendor" ? "vendor" : "customer";

  if (!auth.isLoaded) {
    return <div className="h-96 animate-pulse rounded-4xl bg-ink-100" aria-label="Loading" />;
  }

  if (!auth.isSignedIn) {
    return (
      <div className="rounded-4xl border border-ink-100 bg-white p-8 text-center shadow-soft-sm">
        <h1 className="text-xl font-extrabold text-ink-900">Create your account first</h1>
        <p className="mt-2 text-sm text-ink-500">You need to sign up before completing your {roleWord} profile.</p>
        <Button href={`/register/${role}/${type}`} className="mt-5">Sign up</Button>
      </div>
    );
  }

  if (auth.user?.onboarded && !done) {
    return (
      <div className="rounded-4xl border border-ink-100 bg-white p-8 text-center shadow-soft-sm">
        <BadgeCheck size={32} className="mx-auto text-brand-700" />
        <h1 className="mt-3 text-xl font-extrabold text-ink-900">You&apos;re already registered</h1>
        <p className="mt-2 text-sm text-ink-500">Your {auth.user.role} profile is set up.</p>
        <Button href={dashboardPathFor(auth.user.role)} className="mt-5">Go to dashboard</Button>
      </div>
    );
  }

  const setValue = (name: string, v: string | string[] | boolean) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validateStep = () => {
    const next: Record<string, string> = {};
    for (const f of step.fields) {
      const err = validateField(f, values[f.name]);
      if (err) next[f.name] = err;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
      return false;
    }
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    setServerError(null);
    const verification: VerificationStatus = role === "vendor" ? "pending" : type === "b2b" ? "pending" : "verified";
    try {
      if (clerkEnabled) {
        const res = await completeOnboarding(role, type, values);
        if (!res.ok) throw new Error(res.error);
        await auth.refresh();
      } else {
        const u = auth.user!;
        writeDemoUser(
          newDemoUser({
            ...u,
            role,
            accountType: type,
            onboarded: true,
            verification,
            company: typeof values.legalName === "string" ? values.legalName : u.company,
          })
        );
        try {
          window.localStorage.setItem(`mg_demo_profile_${u.id}`, JSON.stringify(values));
        } catch {
          /* ignore */
        }
      }
      setDone(verification);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onNext = () => {
    if (!validateStep()) return;
    if (isLast) void submit();
    else setIndex((i) => i + 1);
  };

  if (done) {
    const pending = done === "pending";
    return (
      <div className="rounded-4xl border border-ink-100 bg-white p-8 text-center shadow-soft-sm sm:p-10">
        <span className={cn("mx-auto flex h-14 w-14 items-center justify-center rounded-full", pending ? "bg-accent-50 text-accent-600" : "bg-success-50 text-success-600")}>
          {pending ? <Clock size={26} /> : <CheckCircle2 size={26} />}
        </span>
        <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 outline-none">
          {pending ? "Submitted for verification" : "You're all set"}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
          {pending
            ? role === "vendor"
              ? "Our team reviews your documents, usually within 1–2 business days. You can prepare listings now — they go live once you're verified."
              : "We're validating your business details. You can browse, save deals and request quotes right away."
            : "Your account is ready. Explore deals near you or post a requirement."}
        </p>
        <ul className="mx-auto mt-6 flex max-w-xs flex-col gap-2 text-left text-sm text-ink-600">
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-600" /> Account created</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success-600" /> Profile completed ({TYPE_LABEL[type]})</li>
          <li className="flex items-center gap-2">
            {pending ? <Clock size={16} className="text-accent-600" /> : <ShieldCheck size={16} className="text-success-600" />}
            {pending ? "Verification in progress" : "Ready to go"}
          </li>
        </ul>
        <Button onClick={() => router.push(dashboardPathFor(role))} size="lg" className="mt-7 w-full sm:w-auto">
          Go to my dashboard <ArrowRight size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-ink-100 bg-white p-6 shadow-soft-sm sm:p-9">
      <nav aria-label="Onboarding progress">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.id} aria-current={i === index ? "step" : undefined} className="flex flex-1 flex-col gap-1.5">
              <span className={cn("h-1.5 rounded-full transition-colors", i <= index ? "bg-accent-500" : "bg-ink-100")} />
              <span className={cn("hidden text-[11px] font-semibold sm:block", i === index ? "text-ink-900" : "text-ink-400")}>{s.title}</span>
            </li>
          ))}
        </ol>
      </nav>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-600" aria-live="polite">
        Step {index + 1} of {steps.length} · {TYPE_LABEL[type]} {roleWord}
      </p>
      <h1 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900 outline-none">{step.title}</h1>
      <p className="mt-1.5 text-sm text-ink-500">{step.description}</p>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="mt-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {step.fields.map((f) => (
            <FieldControl
              key={f.name}
              field={f}
              value={values[f.name]}
              error={errors[f.name]}
              categories={categories}
              onChange={(v) => setValue(f.name, v)}
            />
          ))}
        </div>

        {serverError && (
          <p role="alert" className="mt-4 rounded-xl bg-danger-50 px-3.5 py-2.5 text-sm font-medium text-danger-600">{serverError}</p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {index > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setIndex((i) => i - 1)}>
              <ArrowLeft size={16} /> Back
            </Button>
          ) : (
            <Link href="/register" className="text-sm font-medium text-ink-500 hover:text-ink-800">Change account type</Link>
          )}
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
            {isLast ? "Submit for review" : "Continue"}
            {!submitting && <ArrowRight size={18} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
