"use client"

import { ShareIcon } from "lucide-react"
import { toast } from "sonner"

import { CopyField } from "@/components/copy-field"
import { accountDetails } from "@/lib/account-details"
import { Button } from "@workspace/ui/components/button"

export function AccountDetailsList() {
  return (
    <section className="flex flex-col">
      {accountDetails.map((item) => (
        <CopyField key={item.label} {...item} />
      ))}
    </section>
  )
}

export function AchFundingNote() {
  return (
    <p className="text-[13px] leading-relaxed text-muted-foreground">
      This is your personal USD account. Only send from a bank account in your
      own name.
    </p>
  )
}

export function ShareDetailsButton() {
  async function handleShare() {
    const text = accountDetails
      .map((item) => `${item.label}: ${item.value}`)
      .join("\n")

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Bank account details",
          text,
        })
        return
      }

      await navigator.clipboard.writeText(text)
      toast.success("Details copied")
    } catch {
      // User cancelled share — ignore
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 w-full rounded-full text-[13px] font-medium"
      onClick={handleShare}
    >
      <ShareIcon data-icon="inline-start" />
      Share details
    </Button>
  )
}
