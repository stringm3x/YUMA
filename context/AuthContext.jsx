"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario de localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem("yuma-user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  // Guardar usuario cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("yuma-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("yuma-user");
    }
  }, [user]);

  // LOGIN (llama /api/login)
  const login = async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se pudo iniciar sesión");
    // Guardas email y accessToken (Shopify)
    setUser({ email, accessToken: data.accessToken });
    return { email, accessToken: data.accessToken };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    // Si necesitas, también puedes limpiar cookies aquí
    window.location.reload(); // Opcional: para refrescar el UI
  };

  // REGISTRO (puedes adaptar si tienes /api/register)
  const register = async (info) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "No se pudo crear cuenta");
    // Aquí puedes guardar el email o lo que te regrese el backend
    setUser({ email: info.email, accessToken: data.accessToken });
    return { email: info.email, accessToken: data.accessToken };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
