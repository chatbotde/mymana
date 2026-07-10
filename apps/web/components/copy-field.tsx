"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@workspace/ui/lib/utils"

type CopyFieldProps = {
  label: string
  value: string
  copyable?: boolean
}

export function CopyField({
  label,
  value,
  copyable = true,
}: CopyFieldProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    if (!copyable) return

    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success(`${label} copied`)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      toast.error("Couldn’t copy")
    }
  }

  if (!copyable) {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-center gap-4 border-b border-border py-3.5 last:border-b-0">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <span className="truncate text-right text-[13px] font-medium tracking-tight text-foreground">
          {value}
        </span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] items-center gap-4 border-b border-border py-3.5 text-left transition-colors last:border-b-0 hover:bg-muted/40"
      aria-label={`Copy ${label}`}
    >
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="truncate text-right font-mono text-[13px] font-medium tracking-tight text-foreground tabular-nums">
        {value}
      </span>
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-md text-muted-foreground",
          copied && "text-foreground"
        )}
        aria-hidden
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </span>
    </button>
  )
}
