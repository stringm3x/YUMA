"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("yuma-user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("yuma-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("yuma-user");
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se pudo iniciar sesión");
    setUser({ email, accessToken: data.accessToken });
    return { email, accessToken: data.accessToken };
  };

  const logout = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
