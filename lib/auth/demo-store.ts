"use client";

import type { AppUser } from "./types";

const KEY = "mg_demo_session";
const EVENT = "mg-demo-auth";

export function readDemoSessionRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseDemoUser(raw: string | null): AppUser | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export function writeDemoUser(user: AppUser | null) {
  try {
    if (user) window.localStorage.setItem(KEY, JSON.stringify(user));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — session simply won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeDemoSession(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function newDemoUser(partial: Partial<AppUser> & { email: string; name: string }): AppUser {
  return {
    id: `demo_${partial.email.toLowerCase()}`,
    role: null,
    accountType: null,
    onboarded: false,
    verification: "unverified",
    ...partial,
  };
}
