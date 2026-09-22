import Link from "next/link";

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
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">
            L
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink-900">Lotwise</span>
        </Link>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">{title}</h1>
        <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>

        <div className="mt-6">{children}</div>

        <p className="mt-6 text-center text-sm text-ink-500">
          {footer.text}{" "}
          <Link href={footer.href} className="font-semibold text-brand-600 hover:text-brand-700">
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
      <label className="text-xs font-medium text-ink-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-ink-200 px-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none"
      />
    </div>
  );
}
