"use client"

import { EyeIcon, SettingsIcon, SnowflakeIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

const cardActions = [
  { id: "details", label: "Details", icon: EyeIcon },
  { id: "freeze", label: "Freeze", icon: SnowflakeIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
] as const

type CardActionId = (typeof cardActions)[number]["id"]

type CardActionButtonsProps = {
  frozen: boolean
  onAction: (id: CardActionId) => void
  className?: string
}

export function CardActionButtons({
  frozen,
  onAction,
  className,
}: CardActionButtonsProps) {
  return (
    <div
      className={cn(
        "grid w-full max-w-[19rem] grid-cols-3 gap-2 sm:max-w-[21rem] sm:gap-3",
        className
      )}
    >
      {cardActions.map((action) => {
        const Icon = action.icon
        const isFreeze = action.id === "freeze"
        const label = isFreeze && frozen ? "Unfreeze" : action.label
        const isActive = isFreeze && frozen

        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action.id)}
            className="group flex flex-col items-center gap-2 rounded-xl py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <span
              className={cn(
                "flex size-[3.75rem] items-center justify-center rounded-full bg-background ring-1 ring-foreground/10 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200",
                "group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] group-hover:ring-foreground/15",
                "group-active:translate-y-0 group-active:shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
                isActive &&
                  "bg-primary/6 ring-primary/25 shadow-[0_2px_8px_rgba(217,95,57,0.12)]"
              )}
            >
              <Icon
                className={cn(
                  "size-5 text-primary transition-transform duration-200 group-hover:scale-105",
                  isActive && "text-primary"
                )}
                strokeWidth={1.6}
              />
            </span>
            <span className="text-[12px] font-medium tracking-tight text-primary">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export type { CardActionId }
