"use client"

import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import { sanitizeAmountInput } from "@/lib/send"

type AmountInputProps = {
  value: string
  onChange: (value: string) => void
  className?: string
  id?: string
  autoFocus?: boolean
}

export function AmountInput({
  value,
  onChange,
  className,
  id = "amount",
  autoFocus,
}: AmountInputProps) {
  const display = value === "0" ? "" : value

  return (
    <div className={cn("relative w-full", className)}>
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[28px] font-semibold tracking-tight text-muted-foreground">
        $
      </span>
      <Input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder="0.00"
        value={display}
        onChange={(event) => {
          const next = sanitizeAmountInput(event.target.value)
          onChange(next === "" ? "0" : next)
        }}
        className="h-14 rounded-md border-border bg-background pl-9 text-[28px] font-semibold tracking-[-0.03em] tabular-nums md:h-16 md:text-[32px]"
      />
    </div>
  )
}
