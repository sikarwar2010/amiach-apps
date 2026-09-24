import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/AuthShell";
import { DemoSignIn } from "@/components/auth/DemoAuth";
import { clerkEnabled } from "@/lib/auth/config";
import { clerkAppearance } from "@/components/auth/clerkAppearance";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Source surplus. Sell surplus. One account."
      points={[
        "Track quotes, requirements and orders in one place",
        "Suppliers manage listings, enquiries and verification",
        "Business buyers get GST invoices and bulk pricing",
      ]}
    >
      {clerkEnabled ? (
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/register"
          fallbackRedirectUrl="/dashboard"
          appearance={clerkAppearance}
        />
      ) : (
        <DemoSignIn />
      )}
    </AuthShell>
  );
}
