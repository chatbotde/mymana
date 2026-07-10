"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth/auth-context"
import { routes } from "@/lib/routes"

export default function RootPage() {
  const router = useRouter()
  const { session, hydrated } = useAuth()

  useEffect(() => {
    if (!hydrated) return
    router.replace(session ? routes.home : routes.welcome)
  }, [hydrated, session, router])

  return (
    <div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted-foreground">
      Loading…
    </div>
  )
}
