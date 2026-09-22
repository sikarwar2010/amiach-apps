import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
        <PackageSearch size={28} />
      </span>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900">
        Material not found
      </h1>
      <p className="mt-2 max-w-sm text-ink-500">
        This listing may have sold out or been removed. Explore the rest of
        the marketplace instead.
      </p>
      <Button href="/materials" size="lg" className="mt-6">
        Explore Materials
      </Button>
    </main>
  );
}
