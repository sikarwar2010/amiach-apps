"use client";

import { useCallback, useEffect, useState } from "react";
import { clerkEnabled } from "@/lib/auth/config";
import type { VerificationStatus } from "@/lib/auth/types";
import { adminSeedAccounts } from "@/lib/dashboard-data";
import { listAccounts, setVerification, type AdminAccountRow } from "@/app/onboarding/actions";

/**
 * Admin account service. Clerk mode → server actions (re-checked server-side against the
 * caller's admin role). Demo mode → seeded rows with overrides kept in localStorage.
 */
const KEY = "mg_demo_verifications";

function readOverrides(): Record<string, VerificationStatus> {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function useAdminAccounts() {
  const [rows, setRows] = useState<AdminAccountRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (clerkEnabled) {
      const res = await listAccounts();
      if (res.ok) setRows(res.rows);
      else setError(res.error);
    } else {
      const o = readOverrides();
      setRows(adminSeedAccounts.map((r) => ({ ...r, verification: o[r.id] ?? r.verification })));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = useCallback(
    async (id: string, status: VerificationStatus) => {
      const previous = rows;
      setRows((r) => r.map((x) => (x.id === id ? { ...x, verification: status } : x)));
      if (clerkEnabled) {
        const res = await setVerification(id, status);
        if (!res.ok) {
          setRows(previous);
          setError(res.error);
        }
      } else {
        try {
          window.localStorage.setItem(KEY, JSON.stringify({ ...readOverrides(), [id]: status }));
        } catch {
          /* ignore */
        }
      }
    },
    [rows]
  );

  return { rows, loading, error, setStatus, reload: load };
}
