import Link from "next/link"

import { formatUsd } from "@/lib/send"
import { routes } from "@/lib/routes"
import { cn } from "@workspace/ui/lib/utils"

type AmountSummaryCardProps = {
  amount: number
  changeHref?: string
  className?: string
}

export function AmountSummaryCard({
  amount,
  changeHref = routes.send,
  className,
}: AmountSummaryCardProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 border-b border-border pb-5",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-muted-foreground">
          You&apos;re sending
        </span>
        <span className="text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums text-foreground">
          {formatUsd(amount)}
        </span>
      </div>
      <Link
        href={changeHref}
        className="pb-0.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Change
      </Link>
    </div>
  )
}
