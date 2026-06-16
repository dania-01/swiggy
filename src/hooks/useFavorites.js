"use client";

import { useCallback, useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("swiggy_favorites") || "[]");
      setFavorites(new Set(stored));
    } catch {}
  }, []);

  const toggle = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem("swiggy_favorites", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
