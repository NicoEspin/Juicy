"use client";

import { useCallback, useEffect, useState } from "react";
import { readJSON, STORAGE_KEYS, writeJSON } from "@/lib/ordering/storage";

interface FavoritesPayload {
  version: 1;
  productIds: string[];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = readJSON<FavoritesPayload>(STORAGE_KEYS.favorites);
    if (stored && stored.version === 1 && Array.isArray(stored.productIds)) {
      // localStorage doesn't exist during SSR, so hydrating favorites has to happen post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites(stored.productIds);
    }
  }, []);

  const toggle = useCallback((productId: string) => {
    setFavorites((current) => {
      const has = current.includes(productId);
      const next = has ? current.filter((id) => id !== productId) : current.concat(productId);
      writeJSON<FavoritesPayload>(STORAGE_KEYS.favorites, { version: 1, productIds: next });
      return next;
    });
  }, []);

  return { favorites, toggle };
}
