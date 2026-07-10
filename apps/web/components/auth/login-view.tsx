"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useAuth } from "@/components/auth/auth-context"
import { ManaLogo } from "@/components/mana-logo"
import { DEMO_OTP } from "@/lib/auth"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

type Step = "email" | "otp"

export function LoginView() {
  const router = useRouter()
  const { session, hydrated, sendCode, verifyCode } = useAuth()
  const [step, setStep] = React.useState<Step>("email")
  const [email, setEmail] = React.useState("")
  const [code, setCode] = React.useState("")
  const [pending, setPending] = React.useState(false)

  React.useEffect(() => {
    if (hydrated && session) {
      router.replace(routes.home)
    }
  }, [hydrated, session, router])

  function handleSendCode(event: React.FormEvent) {
    event.preventDefault()
    const result = sendCode(email)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    setStep("otp")
    toast.success("Code sent")
  }

  function handleVerify(event: React.FormEvent) {
    event.preventDefault()
    setPending(true)
    const result = verifyCode(email, code)
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
            We&apos;ll email you a one-time code. No password to remember.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Demo OTP: <span className="font-medium text-foreground">{DEMO_OTP}</span>
        </p>
      </section>

      <section className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="lg:hidden">
            <ManaLogo />
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  What&apos;s your email?
                </h2>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll send a code to confirm it&apos;s you.
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
              </FieldGroup>

              <Button
                type="submit"
                className="h-12 w-full rounded-full text-sm font-medium"
              >
                Send code
              </Button>

              <Link
                href={routes.welcome}
                className="text-center text-sm text-muted-foreground transition-opacity hover:opacity-70"
              >
                Back to welcome
              </Link>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Enter the code
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sent to {email}. It expires shortly.
                </p>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                    placeholder="6-digit code"
                    value={code}
                    onChange={(event) =>
                      setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="h-12 rounded-2xl bg-card px-4 text-lg tracking-[0.3em] tabular-nums"
                  />
                  <FieldDescription>
                    Type with your keyboard. Demo code: {DEMO_OTP}
                  </FieldDescription>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={pending || code.length < 6}
                className="h-12 w-full rounded-full text-sm font-medium"
              >
                Verify
              </Button>

              <div className="flex flex-col gap-2 text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    const result = sendCode(email)
                    if (result.ok) toast.success("Code resent")
                  }}
                  className="font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Didn&apos;t get it? Resend code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email")
                    setCode("")
                  }}
                  className="text-muted-foreground transition-opacity hover:opacity-70"
                >
                  Use a different email
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
