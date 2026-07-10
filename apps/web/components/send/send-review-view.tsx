"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { useSendDraft } from "@/components/send/send-draft-context"
import { useWallet } from "@/components/wallet/wallet-context"
import { FlowHeader } from "@/components/flow-header"
import { minorToAmount, readAmountMinor } from "@/lib/amount"
import {
  formatPhp,
  formatUsd,
  getArrivalLabel,
  getBankLabel,
  getMethodLabel,
  getTransferQuote,
} from "@/lib/send"
import { remitComposeHref, routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

function DetailRow({
  label,
  value,
  onCopy,
}: {
  label: string
  value: string
  onCopy?: () => void
}) {
  if (onCopy) {
    return (
      <button
        type="button"
        onClick={onCopy}
        className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-4 border-b border-border py-3.5 text-left transition-colors last:border-b-0 hover:bg-muted/40"
      >
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <span className="truncate text-right text-[13px] font-medium text-foreground">
          {value}
        </span>
      </button>
    )
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-4 border-b border-border py-3.5 last:border-b-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="truncate text-right text-[13px] font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}

export function SendReviewView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { draft, setAmount, reset } = useSendDraft()
  const { mainBalance } = useWallet()
  const quote = getTransferQuote(draft.amount, mainBalance)
  const [lockSeconds, setLockSeconds] = React.useState(30)

  React.useEffect(() => {
    const amountMinor = readAmountMinor(searchParams)
    if (!amountMinor) {
      router.replace(routes.send)
      return
    }

    const amount = minorToAmount(amountMinor)
    if (amount !== draft.amount) {
      setAmount(amount)
    }
  }, [draft.amount, router, searchParams, setAmount])

  React.useEffect(() => {
    if (!quote.isValidAmount) {
      router.replace(routes.send)
    }
  }, [quote.isValidAmount, router])

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setLockSeconds((current) => (current <= 1 ? 30 : current - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const destination =
    draft.method === "bank"
      ? `${draft.accountNumber} · ${getBankLabel(draft.bankId)}`
      : `${draft.mobile} · ${getMethodLabel(draft.method)}`

  async function copyValue(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} copied`)
    } catch {
      toast.error("Couldn’t copy")
    }
  }

  function handleConfirm() {
    if (quote.hasInsufficientBalance) {
      toast.error("Add money before sending")
      return
    }

    toast.success("Transfer submitted")
    reset()
    router.push(routes.home)
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Review transfer"
          backHref={remitComposeHref(draft.amount)}
          description="Confirm the details before sending."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section className="flex flex-col gap-2 border-b border-border pb-6 lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0">
            <p className="text-[13px] text-muted-foreground">
              Recipient receives
            </p>
            <button
              type="button"
              onClick={() => copyValue("Amount", formatPhp(quote.receives))}
              className="w-fit text-left text-[2.5rem] leading-none font-semibold tracking-[-0.04em] tabular-nums text-foreground transition-opacity hover:opacity-70"
            >
              {formatPhp(quote.receives)}
            </button>
            <p
              className={cn(
                "mt-3 text-[13px]",
                quote.hasInsufficientBalance
                  ? "font-medium text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {quote.hasInsufficientBalance
                ? "Insufficient balance to complete this transfer."
                : `Rate locked for ${lockSeconds}s`}
            </p>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="border-b border-border pb-3">
                <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Transfer details
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Click a row to copy.
                </p>
              </div>

              <DetailRow
                label="You pay exactly"
                value={formatUsd(quote.amount)}
                onCopy={() => copyValue("Amount", formatUsd(quote.amount))}
              />
              <DetailRow
                label="Total fees"
                value={formatUsd(quote.fee)}
                onCopy={() => copyValue("Fees", formatUsd(quote.fee))}
              />
              <DetailRow
                label="Guaranteed rate"
                value={`1 USD = ₱${quote.rate.toFixed(2)}`}
                onCopy={() =>
                  copyValue("Rate", `1 USD = ₱${quote.rate.toFixed(2)}`)
                }
              />
              <DetailRow label="Paying with" value="USD wallet" />
              <DetailRow
                label="Estimated arrival"
                value={getArrivalLabel(draft.method)}
              />
              <DetailRow
                label="To"
                value={destination}
                onCopy={() => copyValue("Recipient", destination)}
              />
            </div>

            <Button
              className="h-9 w-full rounded-md text-[13px] font-medium"
              disabled={quote.hasInsufficientBalance}
              onClick={handleConfirm}
            >
              {quote.hasInsufficientBalance
                ? "Insufficient balance"
                : "Confirm and send"}
            </Button>
          </section>
        </div>
      </main>
    </div>
  )
}
