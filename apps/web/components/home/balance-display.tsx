"use client"

import {
  ACCOUNT_LAST4,
  formatPhp,
  formatUsd,
  phpEquivalent,
  USD_TO_PHP,
} from "@/lib/balance"
import { useWallet } from "@/components/wallet/wallet-context"

type BalanceDisplayProps = {
  size?: "default" | "large"
  showAccountMeta?: boolean
}

export function BalanceDisplay({
  size = "default",
  showAccountMeta = true,
}: BalanceDisplayProps) {
  const { mainBalance } = useWallet()
  const phpAmount = phpEquivalent(mainBalance)

  return (
    <div className="flex flex-col gap-3">
      {showAccountMeta ? (
        <div className="flex items-center gap-3">
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
            Accounts
          </p>
          <span className="text-[13px] text-border">|</span>
          <p className="font-mono text-[13px] text-muted-foreground">
            •••• {ACCOUNT_LAST4}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <p
          className={
            size === "large"
              ? "text-[2.75rem] leading-none font-semibold tracking-[-0.04em] tabular-nums text-foreground md:text-5xl"
              : "text-[2.25rem] leading-none font-semibold tracking-[-0.03em] tabular-nums text-foreground"
          }
        >
          {formatUsd(mainBalance)}
        </p>
        <p className="text-[13px] text-muted-foreground">
          ≈ {formatPhp(phpAmount)} · 1 USD = {formatPhp(USD_TO_PHP)}
        </p>
      </div>
    </div>
  )
}
