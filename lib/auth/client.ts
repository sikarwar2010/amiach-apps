"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { clerkEnabled } from "./config";
import {
  parseDemoUser,
  readDemoSessionRaw,
  subscribeDemoSession,
  writeDemoUser,
} from "./demo-store";
import type { AppAuth, AppMetadata, AppUser } from "./types";

function useClerkAppAuth(): AppAuth {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  const appUser = useMemo<AppUser | null>(() => {
    if (!user) return null;
    const meta = (user.publicMetadata ?? {}) as AppMetadata;
    return {
      id: user.id,
      name: user.fullName || user.primaryEmailAddress?.emailAddress || "Account",
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      role: meta.role ?? null,
      accountType: meta.accountType ?? null,
      onboarded: Boolean(meta.onboarded),
      verification: meta.verification ?? "unverified",
      company: meta.company,
    };
  }, [user]);

  return {
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    user: appUser,
    signOut: () => clerk.signOut({ redirectUrl: "/" }),
    refresh: async () => {
      await user?.reload();
    },
  };
}

function useDemoAppAuth(): AppAuth {
  const raw = useSyncExternalStore(subscribeDemoSession, readDemoSessionRaw, () => null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const user = useMemo(() => parseDemoUser(raw), [raw]);

  return {
    isLoaded: mounted,
    isSignedIn: Boolean(user),
    user,
    signOut: () => writeDemoUser(null),
    refresh: () => undefined,
  };
}

// `clerkEnabled` is fixed at build time, so exactly one hook implementation is ever
// used for the lifetime of the app (hook order stays stable).
export const useAppAuth: () => AppAuth = clerkEnabled ? useClerkAppAuth : useDemoAppAuth;
