"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swiggy_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("swiggy_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("swiggy_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
