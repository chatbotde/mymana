"use client"

import * as React from "react"
import { toast } from "sonner"

import { CopyField } from "@/components/copy-field"
import { FlowHeader } from "@/components/flow-header"
import { VirtualCard } from "@/components/card/virtual-card"
import { cardInfo } from "@/lib/card"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

export function CardDetailsView() {
  const [revealed, setRevealed] = React.useState(false)

  async function copyAll() {
    const text = [
      `Card number: ${cardInfo.fullNumber}`,
      `Expiry: ${cardInfo.expiry}`,
      `CVV: ${cardInfo.cvv}`,
      `Name: ${cardInfo.holder}`,
    ].join("\n")

    try {
      await navigator.clipboard.writeText(text)
      toast.success("Card details copied")
    } catch {
      toast.error("Couldn’t copy")
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Card details"
          backHref={routes.card}
          description="Reveal and copy your card credentials."
        />

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <VirtualCard
            revealed={revealed}
            href={null}
            className="max-w-md lg:max-w-none"
          />

          <section className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="border-b border-border pb-3">
                <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Credentials
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {revealed
                    ? "Click a row to copy."
                    : "Reveal details to copy card number and CVV."}
                </p>
              </div>

              <CopyField
                label="Card number"
                value={
                  revealed
                    ? cardInfo.fullNumber
                    : `•••• •••• •••• ${cardInfo.last4}`
                }
                copyable={revealed}
              />
              <CopyField
                label="Expiry"
                value={cardInfo.expiry}
                copyable={revealed}
              />
              <CopyField
                label="CVV"
                value={revealed ? cardInfo.cvv : "•••"}
                copyable={revealed}
              />
              <CopyField label="Name on card" value={cardInfo.holder} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="h-9 rounded-md px-3.5 text-[13px] font-medium"
                onClick={() => setRevealed((prev) => !prev)}
              >
                {revealed ? "Hide details" : "Reveal details"}
              </Button>
              <Button
                className="h-9 rounded-md px-3.5 text-[13px] font-medium"
                disabled={!revealed}
                onClick={copyAll}
              >
                Copy all
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
