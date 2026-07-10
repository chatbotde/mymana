import { FlowHeader } from "@/components/flow-header"
import { routes } from "@/lib/routes"

export function PassbookView() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Passbook"
          backHref={routes.account}
          description="Deposits and withdrawals on your USD account."
        />

        <div className="flex min-h-56 flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
            No account transactions yet — deposits and withdrawals on your USD
            account will show up here.
          </p>
        </div>
      </main>
    </div>
  )
}
