import Link from "next/link"
import { ChevronRightIcon, PlusIcon } from "lucide-react"

import { BalanceDisplay } from "@/components/home/balance-display"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

export function AccountsCard() {
  return (
    <section className="flex flex-col gap-6 border-b border-border pb-10">
      <Link
        href={routes.account}
        className="group flex flex-col gap-6 rounded-md transition-colors hover:bg-muted/30 sm:flex-row sm:items-end sm:justify-between"
      >
        <BalanceDisplay />

        <span className="flex size-8 shrink-0 items-center justify-center self-end rounded-md text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground sm:self-auto">
          <ChevronRightIcon className="size-4" />
        </span>
      </Link>

      <Button
        nativeButton={false}
        render={<Link href={routes.addMoney} />}
        className="h-9 w-fit rounded-md px-3.5 text-[13px] font-medium"
      >
        <PlusIcon data-icon="inline-start" />
        Add money
      </Button>
    </section>
  )
}
