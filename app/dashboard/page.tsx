"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppAuth } from "@/lib/auth/client";
import { dashboardPathFor } from "@/lib/auth/types";

/** Sends each signed-in user to the dashboard for their role. */
export default function DashboardIndex() {
  const { isLoaded, isSignedIn, user } = useAppAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/login");
    else if (!user?.role || (!user.onboarded && user.role !== "admin")) router.replace("/register");
    else router.replace(dashboardPathFor(user.role));
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <main className="container-page flex min-h-[60vh] items-center justify-center pt-32" aria-busy="true">
      <p className="text-sm text-ink-500">Loading your dashboard…</p>
    </main>
  );
}
