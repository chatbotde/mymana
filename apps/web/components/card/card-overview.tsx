"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  CardActionButtons,
  type CardActionId,
} from "@/components/card/card-action-buttons"
import { CardPinDialog } from "@/components/card/card-pin-dialog"
import { CardSettingsDialog } from "@/components/card/card-settings-dialog"
import { CashbackSection } from "@/components/card/cashback-section"
import { CopyField } from "@/components/copy-field"
import { VirtualCard } from "@/components/card/virtual-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { cardInfo } from "@/lib/card"

export function CardOverview() {
  const [frozen, setFrozen] = React.useState(false)
  const [pinOpen, setPinOpen] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [revealed, setRevealed] = React.useState(false)

  function handleFreeze() {
    setFrozen((prev) => {
      const next = !prev
      toast.success(next ? "Card frozen" : "Card unfrozen")
      return next
    })
  }

  function handleAction(id: CardActionId) {
    if (id === "details") {
      setPinOpen(true)
      return
    }

    if (id === "freeze") {
      handleFreeze()
      return
    }

    setSettingsOpen(true)
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader title="Card" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 lg:mx-0 lg:max-w-none lg:items-stretch">
            <VirtualCard
              revealed={revealed}
              href={null}
              frozen={frozen}
              className="w-full"
            />

            <div className="flex w-full max-w-md flex-col gap-4 lg:max-w-none">
              <p className="text-[13px] text-muted-foreground">
                {frozen ? "Frozen" : cardInfo.status}
              </p>

              <CardActionButtons
                frozen={frozen}
                onAction={handleAction}
                className="self-center lg:self-start"
              />
            </div>

            {revealed ? (
              <div className="flex flex-col border-t border-border pt-4">
                <CopyField
                  label="Card number"
                  value={cardInfo.fullNumber}
                />
                <CopyField label="Expiry" value={cardInfo.expiry} />
                <CopyField label="CVV" value={cardInfo.cvv} />
                <CopyField label="Name on card" value={cardInfo.holder} />
              </div>
            ) : null}
          </section>

          <section className="flex flex-col gap-4 border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <CashbackSection />
          </section>
        </div>

        <section className="flex flex-col">
          <div className="border-b border-border pb-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
              Recent transaction
            </h2>
          </div>

          <div className="flex min-h-36 flex-col items-center justify-center gap-1 py-12 text-center">
            <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
              No card activity yet — your card payments will show up here.
            </p>
          </div>
        </section>
      </main>

      <CardPinDialog
        open={pinOpen}
        onOpenChange={setPinOpen}
        onSuccess={() => setRevealed(true)}
      />

      <CardSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}
