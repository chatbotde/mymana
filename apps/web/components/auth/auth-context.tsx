"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  AUTH_STORAGE_KEY,
  isValidDemoPassword,
  isValidEmail,
  type AuthSession,
} from "@/lib/auth"
import { routes } from "@/lib/routes"

type AuthContextValue = {
  session: AuthSession | null
  hydrated: boolean
  login: (
    email: string,
    password: string
  ) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [session, setSession] = React.useState<AuthSession | null>(null)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
      if (raw) {
        setSession(JSON.parse(raw) as AuthSession)
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
    setHydrated(true)
  }, [])

  const login = React.useCallback((email: string, password: string) => {
    if (!isValidEmail(email)) {
      return { ok: false as const, error: "Enter a valid email address" }
    }
    if (!password.trim()) {
      return { ok: false as const, error: "Enter your password" }
    }
    if (!isValidDemoPassword(password)) {
      return {
        ok: false as const,
        error: "Invalid email or password",
      }
    }

    const next: AuthSession = {
      email: email.trim().toLowerCase(),
      loggedInAt: new Date().toISOString(),
    }
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
    setSession(next)
    return { ok: true as const }
  }, [])

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setSession(null)
    router.push(routes.welcome)
  }, [router])

  const value = React.useMemo(
    () => ({
      session,
      hydrated,
      login,
      logout,
    }),
    [session, hydrated, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.")
  }
  return context
}
