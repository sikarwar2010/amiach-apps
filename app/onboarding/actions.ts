"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { clerkEnabled } from "@/lib/auth/config";
import { validateSubmission, type OnboardingValues } from "@/lib/auth/onboarding-schema";
import type { AccountType, AppMetadata, VerificationStatus } from "@/lib/auth/types";
import { isAccountType, isRole } from "@/lib/auth/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

export interface AdminAccountRow {
  id: string;
  name: string;
  email: string;
  role: string;
  accountType: string;
  verification: VerificationStatus;
  company?: string;
  createdAt: number;
}

/**
 * Persists a completed onboarding profile.
 *
 * - Role can only ever be "customer" or "vendor" here. "admin" is granted manually
 *   in the Clerk dashboard (publicMetadata.role = "admin") and is never client-settable.
 * - Only routing/display flags go to publicMetadata. The full profile (GSTIN, PAN, phone…)
 *   goes to privateMetadata (server-only) as an interim store — move it to a database
 *   table keyed by Clerk user id before production.
 */
export async function completeOnboarding(
  role: string,
  type: string,
  values: OnboardingValues
): Promise<ActionResult> {
  if (!clerkEnabled) return { ok: false, error: "Authentication is not configured." };
  if (!isRole(role) || !isAccountType(type)) return { ok: false, error: "Invalid account selection." };

  const { userId } = await auth();
  if (!userId) return { ok: false, error: "Please sign in to continue." };

  const invalid = validateSubmission(role, type as AccountType, values);
  if (invalid) return { ok: false, error: invalid };

  const user = await currentUser();
  const existing = (user?.publicMetadata ?? {}) as AppMetadata;
  if (existing.role === "admin") return { ok: false, error: "Admin accounts cannot be changed here." };

  const verification: VerificationStatus =
    role === "vendor" ? "pending" : type === "b2b" ? "pending" : "verified";

  const publicMetadata: AppMetadata = {
    role,
    accountType: type,
    onboarded: true,
    verification,
    company: typeof values.legalName === "string" ? values.legalName : undefined,
  };

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: publicMetadata as Record<string, unknown>,
    privateMetadata: { profile: values, submittedAt: new Date().toISOString() },
  });
  return { ok: true };
}

async function requireAdmin(): Promise<string | null> {
  const user = await currentUser();
  const meta = (user?.publicMetadata ?? {}) as AppMetadata;
  return meta.role === "admin" ? user!.id : null;
}

export async function listAccounts(): Promise<{ ok: true; rows: AdminAccountRow[] } | { ok: false; error: string }> {
  if (!clerkEnabled || !(await requireAdmin())) return { ok: false, error: "Not authorised." };
  const client = await clerkClient();
  const { data } = await client.users.getUserList({ limit: 100, orderBy: "-created_at" });
  const rows = data.map((u) => {
    const m = (u.publicMetadata ?? {}) as AppMetadata;
    return {
      id: u.id,
      name: u.fullName || "—",
      email: u.primaryEmailAddress?.emailAddress ?? "",
      role: m.role ?? "—",
      accountType: m.accountType ?? "—",
      verification: m.verification ?? "unverified",
      company: m.company,
      createdAt: u.createdAt,
    } satisfies AdminAccountRow;
  });
  return { ok: true, rows };
}

export async function setVerification(userId: string, status: VerificationStatus): Promise<ActionResult> {
  if (!clerkEnabled || !(await requireAdmin())) return { ok: false, error: "Not authorised." };
  if (!["verified", "rejected", "pending"].includes(status)) return { ok: false, error: "Invalid status." };
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: { verification: status } });
  return { ok: true };
}
