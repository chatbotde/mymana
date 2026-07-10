import Link from "next/link"
import { ChevronRightIcon, PlusIcon, SendIcon } from "lucide-react"

import { BalanceDisplay } from "@/components/home/balance-display"
import { FlowHeader } from "@/components/flow-header"
import { ACCOUNT_LAST4 } from "@/lib/balance"
import { routes } from "@/lib/routes"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"

const detailItems = [
  {
    id: "details",
    title: "Account details",
    description: `•• ${ACCOUNT_LAST4}`,
    href: routes.addMoneyAch,
    badge: "Active",
  },
  {
    id: "passbook",
    title: "Passbook",
    description: "Account transactions",
    href: routes.passbook,
  },
] as const

export function AccountsView() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Accounts"
          backHref={routes.home}
          description="USD account balance, funding details, and transactions."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <section className="flex flex-col gap-6 border-b border-border pb-8 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
            <BalanceDisplay showAccountMeta={false} size="large" />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href={routes.send} />}
                variant="outline"
                className="h-9 rounded-md px-3.5 text-[13px] font-medium"
              >
                <SendIcon data-icon="inline-start" />
                Send
              </Button>
              <Button
                nativeButton={false}
                render={<Link href={routes.addMoney} />}
                className="h-9 rounded-md px-3.5 text-[13px] font-medium"
              >
                <PlusIcon data-icon="inline-start" />
                Add money
              </Button>
            </div>
          </section>

          <section className="flex flex-col">
            <div className="border-b border-border pb-3">
              <h2 className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Details
              </h2>
            </div>

            {detailItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-3.5 transition-colors last:border-b-0 hover:bg-muted/40"
              >
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-foreground">
                      {item.title}
                    </span>
                    {"badge" in item && item.badge ? (
                      <Badge
                        variant="secondary"
                        className="h-5 rounded-md px-1.5 text-[11px] font-medium"
                      >
                        {item.badge}
                      </Badge>
                    ) : null}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
