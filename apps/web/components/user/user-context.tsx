"use client"

import * as React from "react"

import { user, type AppUser } from "@/lib/users"

type UserContextValue = {
  user: AppUser
}

const UserContext = React.createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const value = React.useMemo<UserContextValue>(() => ({ user }), [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider.")
  }
  return context
}
