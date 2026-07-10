import Link from "next/link"
import { Building2Icon, ChevronRightIcon } from "lucide-react"

import { routes } from "@/lib/routes"

export function BankTransferOption() {
  return (
    <Link
      href={routes.addMoneyAch}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-4 transition-colors hover:bg-muted/40"
    >
      <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground">
        <Building2Icon className="size-4" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[14px] font-medium tracking-tight text-foreground">
          Bank transfer (ACH)
        </span>
        <span className="text-[13px] text-muted-foreground">
          From any US bank account · 1–3 business days · free
        </span>
      </span>
      <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
