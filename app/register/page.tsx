import type { Metadata } from "next";
import { UserPlus } from "lucide-react";
import { AuthCard, AuthField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Join a verified network of surplus material buyers and suppliers across India."
      footer={{ text: "Already have an account?", linkLabel: "Sign in", href: "/login" }}
    >
      <form className="flex flex-col gap-4">
        <AuthField label="Company Name" placeholder="Acme Builders Pvt. Ltd." />
        <AuthField label="Business Email" type="email" placeholder="you@company.com" />
        <AuthField label="Password" type="password" placeholder="Create a password" />
        <label className="flex items-start gap-2 text-xs text-ink-500">
          <input type="checkbox" className="mt-0.5" />
          I agree to the Terms &amp; Conditions and Privacy Policy.
        </label>
        <Button type="submit" size="lg" className="mt-1">
          <UserPlus size={17} /> Create Account
        </Button>
      </form>
    </AuthCard>
  );
}
