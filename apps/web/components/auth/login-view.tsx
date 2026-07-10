"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAuth } from "@/components/auth/auth-context"
import { ManaLogo } from "@/components/mana-logo"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function LoginView() {
  const router = useRouter()
  const { session, hydrated, login } = useAuth()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [pending, setPending] = React.useState(false)

  React.useEffect(() => {
    if (hydrated && session) {
      router.replace(routes.home)
    }
  }, [hydrated, session, router])

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setPending(true)
    const result = login(email, password)
    setPending(false)

    if (!result.ok) {
      toast.error(result.error)
      return
    }

    toast.success("Welcome back")
    router.push(routes.home)
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-card px-12 py-14 ring-1 ring-foreground/5 lg:flex">
        <ManaLogo />
        <div className="flex max-w-md flex-col gap-4">
          <h1 className="font-serif text-4xl leading-tight tracking-tight">
            Sign in to Mana
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Access your wallet, send money, and manage your card.
          </p>
        </div>
      </section>

      <section className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="lg:hidden">
            <ManaLogo />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in with your email and password.
              </p>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 rounded-2xl bg-card px-4"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 rounded-2xl bg-card px-4"
                />
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              disabled={pending || !email.trim() || !password.trim()}
              className="h-12 w-full rounded-full text-sm font-medium"
            >
              Sign in
            </Button>

            <Link
              href={routes.welcome}
              className="text-center text-sm text-muted-foreground transition-opacity hover:opacity-70"
            >
              Back to welcome
            </Link>
          </form>
        </div>
      </section>
    </div>
  )
}
