"use client"

import Link from "next/link"

import { ManaLogo } from "@/components/mana-logo"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

export function WelcomeView() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <section className="relative flex flex-col justify-between bg-[linear-gradient(160deg,oklch(0.94_0.02_70)_0%,oklch(0.97_0.01_85)_45%,oklch(0.92_0.03_50)_100%)] px-8 py-10 md:px-12 md:py-14">
        <ManaLogo />
        <div className="flex max-w-lg flex-col gap-5 py-16">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
            The financial home for Filipinos abroad.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Free remittance. Real banking. Built for the way you support family.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for web — keyboard-first, desktop-ready.
        </p>
      </section>

      <section className="flex flex-col justify-center bg-background px-8 py-12 md:px-16">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Get started
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in with email to open your Mana wallet, send money, and
              manage your card.
            </p>
          </div>

          <Button
            nativeButton={false}
            render={<Link href={routes.login} />}
            className="h-12 w-full rounded-full text-sm font-medium"
          >
            Get started
          </Button>

          <p className="text-xs leading-relaxed text-muted-foreground">
            By continuing you agree to our Terms & Privacy Notice.
          </p>
        </div>
      </section>
    </div>
  )
}
