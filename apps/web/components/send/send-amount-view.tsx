"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { AmountInput } from "@/components/amount-input"
import { DashboardHeader } from "@/components/dashboard-header"
import { useSendDraft } from "@/components/send/send-draft-context"
import { useWallet } from "@/components/wallet/wallet-context"
import { formatUsd, getTransferQuote } from "@/lib/send"
import { remitComposeHref } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

export function SendAmountView() {
  const router = useRouter()
  const { draft, setAmount } = useSendDraft()
  const { mainBalance } = useWallet()
  const quote = getTransferQuote(draft.amount, mainBalance)

  function handleContinue() {
    if (!quote.isValidAmount) {
      toast.error("Enter an amount to send")
      return
    }
    router.push(remitComposeHref(draft.amount))
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader title="Send" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <AmountInput
                value={draft.amount}
                onChange={setAmount}
                autoFocus
              />
              <p className="text-[13px] text-muted-foreground">
                {formatUsd(mainBalance)} available · to GCash, Maya, or a
                PH bank
              </p>
            </div>

            {quote.hasInsufficientBalance ? (
              <p className="text-[13px] font-medium text-destructive">
                That&apos;s more than your {formatUsd(mainBalance)}{" "}
                balance.
              </p>
            ) : null}
          </section>

          <aside className="flex flex-col gap-5 border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-muted-foreground">
                You&apos;re sending
              </span>
              <span className="text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums text-foreground">
                {formatUsd(quote.amount)}
              </span>
            </div>
            <Button
              className="h-9 w-full rounded-md text-[13px] font-medium"
              disabled={!quote.isValidAmount}
              onClick={handleContinue}
            >
              Send
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
