import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { isAccountType, isRole } from "@/lib/auth/types";

export const metadata: Metadata = { title: "Complete your profile", robots: { index: false } };

export function generateStaticParams() {
  return (["customer", "vendor"] as const).flatMap((role) => (["b2b", "b2c"] as const).map((type) => ({ role, type })));
}

export default function OnboardingPage({ params }: { params: { role: string; type: string } }) {
  const { role, type } = params;
  if (!isRole(role) || !isAccountType(type)) notFound();

  return (
    <AuthShell
      wide
      eyebrow={role === "vendor" ? "Vendor onboarding" : "Customer onboarding"}
      title={role === "vendor" ? "A few details and your surplus is ready to list." : "Tell us what you build — we'll bring the deals."}
      points={
        role === "vendor"
          ? ["Reviewed by our team, usually within 1–2 business days", "Your documents are used only for verification", "Free to list; buyers pay you directly"]
          : ["Takes about two minutes", "Skip anything optional and add it later", "Business buyers can add GSTIN at checkout"]
      }
    >
      <OnboardingWizard role={role} type={type} />
    </AuthShell>
  );
}
