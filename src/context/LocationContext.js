"use client";

import { createContext, useContext, useState } from "react";

const LocationContext = createContext(null);

const DEFAULT = {
  label: "Other",
  sublabel: "Surdhara Circle, Maple Trade Ctr Rd...",
  city: "Ahmedabad",
};

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(DEFAULT);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
  return ctx;
}
