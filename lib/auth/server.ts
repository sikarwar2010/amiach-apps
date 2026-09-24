import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { clerkEnabled } from "./config";
import { dashboardPathFor, type AppMetadata, type UserRole } from "./types";

/**
 * Server-side role gate for dashboard layouts (Clerk mode). In demo-auth mode the
 * client-side guard in <DashboardShell> handles access instead.
 */
export async function requireRole(role: UserRole) {
  if (!clerkEnabled) return;
  const user = await currentUser();
  if (!user) redirect("/login");
  const meta = (user.publicMetadata ?? {}) as AppMetadata;
  if (meta.role === "admin") {
    if (role !== "admin") redirect("/dashboard/admin");
    return;
  }
  if (!meta.onboarded || !meta.role) redirect("/register");
  if (meta.role !== role) redirect(dashboardPathFor(meta.role));
}
