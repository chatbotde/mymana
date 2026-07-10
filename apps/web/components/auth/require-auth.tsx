"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth/auth-context"
import { routes } from "@/lib/routes"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { session, hydrated } = useAuth()

  React.useEffect(() => {
    if (hydrated && !session) {
      router.replace(routes.welcome)
    }
  }, [hydrated, session, router])

  if (!hydrated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (!session) return null

  return children
}
