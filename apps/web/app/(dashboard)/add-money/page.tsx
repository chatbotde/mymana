import { BankTransferOption } from "@/components/add-money/bank-transfer-option"
import { FlowHeader } from "@/components/flow-header"
import { routes } from "@/lib/routes"

export default function AddMoneyPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="How do you want to add money?"
          backHref={routes.home}
          description="Pick a source. Fees and arrival times are shown up front — never at confirm."
        />

        <section className="flex flex-col">
          <BankTransferOption />
        </section>
      </main>
    </div>
  )
}
