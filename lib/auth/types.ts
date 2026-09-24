export type UserRole = "customer" | "vendor" | "admin";
export type AccountType = "b2b" | "b2c";
export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

/** Stored on the identity provider (Clerk publicMetadata) — safe to expose to the client. */
export interface AppMetadata {
  role?: UserRole;
  accountType?: AccountType;
  onboarded?: boolean;
  verification?: VerificationStatus;
  company?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: UserRole | null;
  accountType: AccountType | null;
  onboarded: boolean;
  verification: VerificationStatus;
  company?: string;
}

export interface AppAuth {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: AppUser | null;
  signOut: () => Promise<void> | void;
  /** Re-fetch the identity provider's copy of the user (after metadata changes). */
  refresh: () => Promise<void> | void;
}

export const ROLE_LABEL: Record<UserRole, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Company Admin",
};

export const TYPE_LABEL: Record<AccountType, string> = {
  b2b: "Business (B2B)",
  b2c: "Individual (B2C)",
};

export function dashboardPathFor(role: UserRole | null | undefined): string {
  if (role === "admin") return "/dashboard/admin";
  if (role === "vendor") return "/dashboard/vendor";
  if (role === "customer") return "/dashboard/customer";
  return "/register";
}

export function isRole(v: string): v is Exclude<UserRole, "admin"> {
  return v === "customer" || v === "vendor";
}
export function isAccountType(v: string): v is AccountType {
  return v === "b2b" || v === "b2c";
}
