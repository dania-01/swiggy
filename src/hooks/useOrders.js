"use client";

import { useCallback, useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swiggy_orders");
      if (stored) setOrders(JSON.parse(stored));
    } catch {}
  }, []);

  const addOrder = useCallback((order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem("swiggy_orders", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { orders, addOrder };
}
