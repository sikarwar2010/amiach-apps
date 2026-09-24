import { Check, FlaskConical } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLogo";
import { clerkEnabled } from "@/lib/auth/config";

export function DemoModeBanner() {
  if (clerkEnabled) return null;
  return (
    <div
      role="note"
      className="mb-5 flex items-start gap-2 rounded-2xl border border-accent-200 bg-accent-50 px-3.5 py-3 text-xs leading-relaxed text-accent-800"
    >
      <FlaskConical size={15} className="mt-0.5 shrink-0" />
      <span>
        <strong className="font-semibold">Demo authentication.</strong> No real accounts are created — the session lives in
        this browser only. Add Clerk keys (see <code>.env.example</code>) to enable production sign-in.
      </span>
    </div>
  );
}

/** Split-screen frame for sign in / sign up / onboarding. Brand panel hidden on small screens. */
export function AuthShell({
  eyebrow,
  title,
  points,
  children,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  points: readonly string[];
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-brand-950 p-12 pt-32 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl"
        />
        <div className="relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">{eyebrow}</span>
          <h2 className="mt-3 max-w-md text-balance text-3xl font-extrabold leading-tight tracking-tight">{title}</h2>
          <ul className="mt-8 flex max-w-md flex-col gap-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mt-12 rounded-3xl bg-white p-6 shadow-soft-xl">
          <BrandLockup />
        </div>
      </aside>

      <section className="flex justify-center px-4 pb-16 pt-28 sm:px-8 lg:items-center lg:pt-28">
        <div className={wide ? "w-full max-w-2xl" : "w-full max-w-md"}>
          <DemoModeBanner />
          {children}
        </div>
      </section>
    </main>
  );
}
