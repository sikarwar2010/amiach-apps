"use client";

import { useEffect, useState } from "react";
import { categories as builtIn } from "@/lib/mock-data";
import type { Category } from "@/lib/types";

/**
 * Category service boundary. Built-in categories are static; admin-created categories are
 * persisted in localStorage for now. Swap the three functions below for API calls
 * (POST /api/categories …) when the backend exists — callers don't change.
 */
const KEY = "mg_custom_categories";
const EVENT = "mg-categories";

export function listCustomCategories(): Category[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Category[]) : [];
  } catch {
    return [];
  }
}

function write(list: Category[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function createCategory(category: Category): { ok: true } | { ok: false; error: string } {
  const all = [...builtIn, ...listCustomCategories()];
  if (all.some((c) => c.slug === category.slug)) return { ok: false, error: "A category with this slug already exists." };
  write([...listCustomCategories(), category]);
  return { ok: true };
}

export function removeCategory(id: string) {
  write(listCustomCategories().filter((c) => c.id !== id));
}

/** Built-in + admin-created categories, live-updating. */
export function useAllCategories(): Category[] {
  const [custom, setCustom] = useState<Category[]>([]);
  useEffect(() => {
    const sync = () => setCustom(listCustomCategories());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return [...builtIn, ...custom];
}
