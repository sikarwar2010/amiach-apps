import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/AuthShell";
import { DemoSignUp } from "@/components/auth/DemoAuth";
import { clerkAppearance } from "@/components/auth/clerkAppearance";
import { clerkEnabled } from "@/lib/auth/config";
import { isAccountType, isRole } from "@/lib/auth/types";

export function generateStaticParams() {
  return (["customer", "vendor"] as const).flatMap((role) => (["b2b", "b2c"] as const).map((type) => ({ role, type })));
}

export function generateMetadata({ params }: { params: { role: string; type: string } }): Metadata {
  return { title: `Register as ${params.type.toUpperCase()} ${params.role}` };
}

const PANEL = {
  vendor: {
    eyebrow: "Sell your surplus",
    title: "Reach verified buyers across India.",
    points: ["List surplus, excess and discontinued stock for free", "Quotes, bulk deals and direct enquiries in one inbox", "Admin verification builds buyer trust in your listings"],
  },
  customer: {
    eyebrow: "Buy smarter",
    title: "Quality materials at better value.",
    points: ["Deals near you, filtered by condition and quantity", "Post a requirement and let suppliers come to you", "Save, compare and request quotes in one tap"],
  },
} as const;

export default function RegisterRolePage({ params }: { params: { role: string; type: string } }) {
  const { role, type } = params;
  if (!isRole(role) || !isAccountType(type)) notFound();
  const panel = PANEL[role];

  return (
    <AuthShell {...panel}>
      {clerkEnabled ? (
        <SignUp
          path={`/register/${role}/${type}`}
          routing="path"
          signInUrl="/login"
          forceRedirectUrl={`/onboarding/${role}/${type}`}
          appearance={clerkAppearance}
        />
      ) : (
        <DemoSignUp role={role} type={type} />
      )}
    </AuthShell>
  );
}
