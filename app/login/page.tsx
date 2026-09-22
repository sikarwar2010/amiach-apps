import type { Metadata } from "next";
import { LogIn } from "lucide-react";
import { AuthCard, AuthField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to buy, request quotes and manage your material sourcing."
      footer={{ text: "Don't have an account?", linkLabel: "Create one", href: "/register" }}
    >
      <form className="flex flex-col gap-4">
        <AuthField label="Business Email" type="email" placeholder="you@company.com" />
        <AuthField label="Password" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-end">
          <a href="#" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            Forgot password?
          </a>
        </div>
        <Button type="submit" size="lg" className="mt-1">
          <LogIn size={17} /> Sign In
        </Button>
      </form>
    </AuthCard>
  );
}
