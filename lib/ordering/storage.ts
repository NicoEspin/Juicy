export const STORAGE_KEYS = {
  cart: "juicy:cart:v1",
  favorites: "juicy:favorites:v1",
  checkoutDraft: "juicy:checkout-draft:v1",
  customer: "juicy:customer:v1",
  whatsappAttempt: "juicy:whatsapp-attempt:v1",
  orders: "juicy:orders:v1",
} as const;

export function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota) — fail silently, in-memory state still works.
  }
}

export function removeKey(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
