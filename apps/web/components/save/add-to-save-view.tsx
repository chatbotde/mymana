"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { AmountInput } from "@/components/amount-input"
import { FlowHeader } from "@/components/flow-header"
import { useWallet } from "@/components/wallet/wallet-context"
import { formatUsd, parseAmount } from "@/lib/send"
import { saveQuickAmounts } from "@/lib/save"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type SaveAmountMode = "deposit" | "withdraw"

function readMode(searchParams: URLSearchParams): SaveAmountMode {
  const mode = searchParams.get("mode")
  return mode === "withdraw" ? "withdraw" : "deposit"
}

export function AddToSaveView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = readMode(searchParams)
  const isWithdraw = mode === "withdraw"

  const { mainBalance, saveBalance, depositToSave, withdrawFromSave } =
    useWallet()

  const [amount, setAmount] = React.useState("0")
  const parsed = parseAmount(amount)
  const availableBalance = isWithdraw ? saveBalance : mainBalance
  const exceedsBalance = parsed > availableBalance

  function handleQuickAmount(value: number | "all") {
    if (value === "all") {
      setAmount(availableBalance > 0 ? String(availableBalance) : "0")
      return
    }
    setAmount(String(value))
  }

  function handleSubmit() {
    if (parsed <= 0) {
      toast.error("Enter an amount to move")
      return
    }
    if (exceedsBalance) {
      toast.error(
        isWithdraw
          ? "Not enough in your Save wallet"
          : "Not enough in your main wallet"
      )
      return
    }

    const ok = isWithdraw
      ? withdrawFromSave(parsed)
      : depositToSave(parsed)

    if (!ok) {
      toast.error("Could not complete the transfer")
      return
    }

    toast.success(
      isWithdraw
        ? `${formatUsd(parsed)} moved to main wallet`
        : `${formatUsd(parsed)} moved to Save`
    )
    router.push(routes.save)
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title={isWithdraw ? "Withdraw from Save" : "Add to Save"}
          backHref={routes.save}
        />

        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
              {isWithdraw ? "From Save wallet" : "From main wallet"}
            </p>
            <AmountInput
              value={amount}
              onChange={setAmount}
              autoFocus
              className="justify-center"
            />
            <p className="text-[13px] text-muted-foreground">
              {formatUsd(availableBalance)} available in{" "}
              {isWithdraw ? "Save" : "main wallet"}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {saveQuickAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleQuickAmount(value)}
                className={cn(
                  "h-9 rounded-full border border-border bg-background px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted",
                  amount === String(value) &&
                    "border-foreground bg-foreground text-background hover:bg-foreground"
                )}
              >
                ${value}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleQuickAmount("all")}
              className="h-9 rounded-full border border-border bg-background px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              All
            </button>
          </div>

          {exceedsBalance ? (
            <p className="text-center text-[13px] font-medium text-destructive">
              That&apos;s more than your available balance.
            </p>
          ) : null}

          <Button
            className="h-10 w-full rounded-full text-[13px] font-medium"
            disabled={parsed <= 0 || exceedsBalance}
            onClick={handleSubmit}
          >
            {isWithdraw
              ? `Move ${formatUsd(parsed)} to main wallet`
              : `Add ${formatUsd(parsed)} to Save`}
          </Button>
        </div>
      </main>
    </div>
  )
}
