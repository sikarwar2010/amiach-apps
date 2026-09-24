import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: { text: string; linkLabel: string; href: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 pb-16 pt-28 sm:pt-32">
      <div className="w-full max-w-md rounded-4xl border border-ink-100 bg-white p-8 shadow-soft-sm sm:p-10">
        <Link href="/" aria-label="Maalgodaam.com home" className="inline-block">
          <BrandLogo height={32} />
        </Link>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">{title}</h1>
        <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>

        <div className="mt-6">{children}</div>

        <p className="mt-6 text-center text-sm text-ink-500">
          {footer.text}{" "}
          <Link href={footer.href} className="font-semibold text-brand-700 hover:text-brand-800">
            {footer.linkLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}

export function AuthField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 h-12 w-full rounded-2xl border border-ink-200 bg-ink-25 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-50"
      />
    </div>
  );
}
