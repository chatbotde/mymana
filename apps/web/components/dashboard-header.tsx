"use client"

import { UserMenu } from "@/components/user/user-menu"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils"

type DashboardHeaderProps = {
  title?: string
  description?: string
  className?: string
}

export function DashboardHeader({
  title,
  description,
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border px-6 py-5 md:px-10",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <SidebarTrigger className="mt-0.5 md:hidden" />
        <div className="flex min-w-0 flex-col gap-1">
          {title ? (
            <h1 className="text-[18px] font-semibold tracking-tight text-foreground">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="text-[13px] text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <UserMenu />
    </header>
  )
}
