"use client"

import { InfoPanel } from "@/components/info-panel"
import { cardInfo, cashbackHowItWorks } from "@/lib/card"
import { formatUsd } from "@/lib/send"

export function CashbackSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums text-foreground">
          {formatUsd(cardInfo.cashbackEarned)}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-muted-foreground">earned this month</p>
          <InfoPanel
            title="How cashback works"
            ariaLabel="How cashback works"
            items={cashbackHowItWorks}
          />
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-muted-foreground">
        Earn cashback automatically on every eligible card purchase.
      </p>
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        Cashback is added to your balance once it&apos;s ready to redeem.
      </p>
    </div>
  )
}
