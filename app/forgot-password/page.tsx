import type { Metadata } from "next";
import { Send } from "lucide-react";
import { AuthCard, AuthField } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your business email and we'll send you a reset link."
      footer={{ text: "Remembered it?", linkLabel: "Sign in", href: "/login" }}
    >
      <form className="flex flex-col gap-4">
        <AuthField label="Business Email" type="email" placeholder="you@company.com" />
        <Button type="submit" size="lg" className="mt-1">
          <Send size={17} /> Send Reset Link
        </Button>
      </form>
    </AuthCard>
  );
}
