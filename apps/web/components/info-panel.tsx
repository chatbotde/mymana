"use client"

import * as React from "react"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

type InfoPanelProps = {
  title: string
  ariaLabel: string
  items: readonly string[]
  trigger?: React.ReactNode
  triggerClassName?: string
  align?: "start" | "center" | "end"
}

const defaultTriggerClassName =
  "flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"

export function InfoPanel({
  title,
  ariaLabel,
  items,
  trigger,
  triggerClassName,
  align = "start",
}: InfoPanelProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        openOnHover
        delay={200}
        closeDelay={200}
        className={cn(defaultTriggerClassName, triggerClassName)}
      >
        {trigger ?? <InfoIcon className="size-3.5" />}
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align={align}
        sideOffset={10}
        className="w-[min(100vw-2rem,20rem)] rounded-2xl p-5"
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-[1.1rem] leading-tight tracking-tight text-foreground">
            {title}
          </h3>

          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[12px] leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <Button
            type="button"
            className="h-10 w-full rounded-full text-[13px] font-medium"
            onClick={() => setOpen(false)}
          >
            Got it
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
