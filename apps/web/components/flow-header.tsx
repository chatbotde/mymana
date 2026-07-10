import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

type FlowHeaderProps = {
  title: string
  backHref: string
  description?: string
  className?: string
}

export function FlowHeader({
  title,
  backHref,
  description,
  className,
}: FlowHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border pb-5",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href={backHref}
          aria-label="Go back"
          className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
        </Link>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-[18px] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description ? (
            <p className="text-[13px] text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
