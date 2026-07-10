"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { AmountSummaryCard } from "@/components/send/amount-summary-card"
import { useSendDraft } from "@/components/send/send-draft-context"
import { useWallet } from "@/components/wallet/wallet-context"
import { FlowHeader } from "@/components/flow-header"
import { minorToAmount, readAmountMinor } from "@/lib/amount"
import {
  formatUsd,
  getArrivalLabel,
  getTransferQuote,
  philippineBanks,
  sendMethods,
} from "@/lib/send"
import { remitReviewHref, routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

export function SendRecipientView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    draft,
    setAmount,
    setMethod,
    setMobile,
    setRecipientName,
    setBankId,
    setAccountNumber,
    setAccountName,
  } = useSendDraft()
  const { mainBalance } = useWallet()

  const quote = getTransferQuote(draft.amount, mainBalance)

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

  function handleContinue() {
    if (quote.hasInsufficientBalance) {
      toast.error("Insufficient balance")
      return
    }

    if (draft.method === "bank") {
      if (!draft.bankId) {
        toast.error("Select a bank")
        return
      }
      if (draft.accountNumber.trim().length < 10) {
        toast.error("Enter a valid account number")
        return
      }
      if (!draft.accountName.trim()) {
        toast.error("Enter the account holder name")
        return
      }
    } else if (draft.mobile.trim().length < 8) {
      toast.error("Enter a valid mobile number")
      return
    }

    router.push(remitReviewHref(draft.amount))
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Send"
          backHref={routes.send}
          description="Choose where the money should go."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <AmountSummaryCard
              amount={quote.amount}
              changeHref={routes.send}
            />
            {quote.hasInsufficientBalance ? (
              <p className="text-[13px] font-medium text-destructive">
                That&apos;s more than your {formatUsd(mainBalance)}{" "}
                balance.
              </p>
            ) : null}
            <p className="text-[13px] text-muted-foreground">
              Arrives in {getArrivalLabel(draft.method).toLowerCase()}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-3">
              <div className="border-b border-border pb-3">
                <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                  Send to
                </h2>
              </div>
              <ToggleGroup
                value={[draft.method]}
                onValueChange={(value) => {
                  const next = value[0]
                  if (next === "gcash" || next === "maya" || next === "bank") {
                    setMethod(next)
                  }
                }}
                variant="outline"
                spacing={1}
                className="flex w-full"
              >
                {sendMethods.map((method) => (
                  <ToggleGroupItem
                    key={method.id}
                    value={method.id}
                    className="h-9 flex-1 rounded-md px-3 text-[13px] aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:border-foreground"
                  >
                    {method.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </section>

            <FieldGroup className="gap-4">
              {draft.method === "bank" ? (
                <>
                  <Field>
                    <FieldLabel className="text-[13px]">Bank</FieldLabel>
                    <Select
                      value={draft.bankId || null}
                      onValueChange={(value) => {
                        if (typeof value === "string") setBankId(value)
                      }}
                    >
                      <SelectTrigger className="h-10 w-full rounded-md bg-background px-3 text-[13px]">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {philippineBanks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="account-number"
                      className="text-[13px]"
                    >
                      Account number
                    </FieldLabel>
                    <Input
                      id="account-number"
                      inputMode="numeric"
                      placeholder="10–14 digits"
                      value={draft.accountNumber}
                      onChange={(event) => setAccountNumber(event.target.value)}
                      className="h-10 rounded-md bg-background px-3 text-[13px]"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="account-name" className="text-[13px]">
                      Account holder name
                    </FieldLabel>
                    <Input
                      id="account-name"
                      placeholder="As registered with the bank"
                      value={draft.accountName}
                      onChange={(event) => setAccountName(event.target.value)}
                      className="h-10 rounded-md bg-background px-3 text-[13px]"
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field>
                    <FieldLabel htmlFor="mobile" className="text-[13px]">
                      Mobile number
                    </FieldLabel>
                    <Input
                      id="mobile"
                      inputMode="tel"
                      placeholder="+63 9XX XXX XXXX or +1 …"
                      value={draft.mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      className="h-10 rounded-md bg-background px-3 text-[13px]"
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="recipient-name"
                      className="text-[13px]"
                    >
                      Recipient name (optional)
                    </FieldLabel>
                    <Input
                      id="recipient-name"
                      placeholder="e.g. Maria Santos"
                      value={draft.recipientName}
                      onChange={(event) => setRecipientName(event.target.value)}
                      className="h-10 rounded-md bg-background px-3 text-[13px]"
                    />
                  </Field>
                </>
              )}
            </FieldGroup>

            <Button
              className="h-9 w-full rounded-md text-[13px] font-medium"
              onClick={handleContinue}
            >
              Review transfer
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
