'use client'

import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext({
  token: null,
  login: async () => {},
  logout: () => {}
})

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  // Al montar, leemos del localStorage
  useEffect(() => {
    const t = localStorage.getItem('shopify_customer_token')
    if (t) setToken(t)
  }, [])

  // Función de login
  const login = async (email, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Error desconocido')
    localStorage.setItem('shopify_customer_token', json.accessToken)
    setToken(json.accessToken)
    return json.accessToken
  }

  // Función de logout
  const logout = () => {
    localStorage.removeItem('shopify_customer_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
