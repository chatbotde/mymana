"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

type InfoHoverCardLink = {
  label: string
  href: string
}

type InfoHoverCardProps = {
  title: string
  ariaLabel: string
  trigger: React.ReactNode
  triggerClassName?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  link?: InfoHoverCardLink
  children: React.ReactNode
}

const linkClassName =
  "inline-flex items-center gap-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"

export function InfoHoverCard({
  title,
  ariaLabel,
  trigger,
  triggerClassName,
  side = "top",
  align = "start",
  link,
  children,
}: InfoHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger
        type="button"
        aria-label={ariaLabel}
        className={cn("cursor-default", triggerClassName)}
      >
        {trigger}
      </HoverCardTrigger>

      <HoverCardContent side={side} align={align}>
        <div className="flex flex-col gap-3">
          <h3 className="font-serif text-[1.05rem] leading-tight tracking-tight text-foreground">
            {title}
          </h3>

          <div className="flex flex-col gap-2.5 text-[12px] leading-relaxed text-muted-foreground">
            {children}
          </div>

          {link ? (
            link.href ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {link.label}
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ) : (
              <span className={linkClassName} aria-disabled="true">
                {link.label}
                <ArrowUpRightIcon className="size-3.5" />
              </span>
            )
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
