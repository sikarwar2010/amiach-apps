import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterChooser } from "@/components/auth/RegisterChooser";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register as a customer or vendor — business (B2B) or individual (B2C) — on Maalgodaam.com.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join Maalgodaam.com"
      title="Build more for less — as a buyer or a supplier."
      points={[
        "Verified suppliers and transparent condition grading",
        "Separate B2B and B2C onboarding — only the fields that matter",
        "Free to list surplus; no listing fees",
      ]}
    >
      <RegisterChooser />
    </AuthShell>
  );
}
