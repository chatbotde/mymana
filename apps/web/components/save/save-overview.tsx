"use client"

import { ZapIcon, ShieldIcon, RefreshCwIcon } from "lucide-react"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard-header"
import { SaveHowItWorksCard } from "@/components/save/save-how-it-works-card"
import { useWallet } from "@/components/wallet/wallet-context"
import { formatUsd } from "@/lib/send"
import { saveBenefits, SAVE_APY } from "@/lib/save"
import { saveAmountHref } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

const benefitIcons = {
  zap: ZapIcon,
  shield: ShieldIcon,
  refresh: RefreshCwIcon,
} as const

export function SaveOverview() {
  const { saveBalance } = useWallet()
  const hasSaveBalance = saveBalance > 0

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader title="Save" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="text-[13px] text-muted-foreground">
                {hasSaveBalance
                  ? "Your Save wallet balance:"
                  : "Open a Save wallet and earn:"}
              </p>
              <SaveHowItWorksCard />
            </div>

            {hasSaveBalance ? (
              <p className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em] tabular-nums text-foreground md:text-5xl">
                {formatUsd(saveBalance)}
              </p>
            ) : (
              <p className="text-[2.75rem] leading-none font-semibold tracking-[-0.04em] tabular-nums text-foreground md:text-5xl">
                {SAVE_APY}%{" "}
                <span className="text-[1.25rem] font-semibold tracking-tight text-muted-foreground md:text-[1.5rem]">
                  APY
                </span>
              </p>
            )}

            <p className="max-w-lg text-[13px] leading-relaxed text-muted-foreground">
              {hasSaveBalance
                ? `Earning ${SAVE_APY}% APY on your Save balance. Move more in or withdraw anytime.`
                : `Move money into a separate Save wallet and earn ${SAVE_APY}% a year.`}
            </p>
          </div>

          <div className="flex flex-col">
            {saveBenefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon]

              return (
                <div
                  key={benefit.id}
                  className="grid grid-cols-[auto_1fr] items-start gap-3 border-b border-border py-3.5 last:border-b-0"
                >
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-muted text-foreground">
                    <Icon className="size-3.5" />
                  </span>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {benefit.title}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              nativeButton={false}
              render={<Link href={saveAmountHref("deposit")} />}
              className="h-10 w-full rounded-full text-[13px] font-medium"
            >
              Move money to Save
            </Button>

            {hasSaveBalance ? (
              <Button
                nativeButton={false}
                render={<Link href={saveAmountHref("withdraw")} />}
                variant="outline"
                className="h-10 w-full rounded-full text-[13px] font-medium"
              >
                Move to main wallet
              </Button>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}
