"use client"

import { InfoIcon } from "lucide-react"

import { InfoHoverCard } from "@/components/info-hover-card"
import { SAVE_APY, SAVE_TERMS_URL } from "@/lib/save"

export function SaveHowItWorksCard() {
  const rateParagraph = `The rate is variable (currently ~${SAVE_APY}% APY) and isn't guaranteed. Yield is not a bank deposit and isn't FDIC-insured, but it is secured via underlying assets.`

  return (
    <InfoHoverCard
      title="How Save works"
      ariaLabel="How Save works"
      side="top"
      align="start"
      trigger={<InfoIcon className="size-3.5" />}
      triggerClassName="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      link={{ label: "Terms & pricing", href: SAVE_TERMS_URL }}
    >
      <p>
        Turn on Save and the dollars in your wallet earn yield automatically
        through a DeFi protocol (Steakhouse Prime USDC on Base).
      </p>
      <p>
        Your money stays in your own wallet and stays liquid — send, spend, or
        withdraw anytime. There&apos;s no lockup.
      </p>
      <p>{rateParagraph}</p>
    </InfoHoverCard>
  )
}
