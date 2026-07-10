import {
  AccountDetailsList,
  AchFundingNote,
  ShareDetailsButton,
} from "@/components/add-money/account-details"
import { FlowHeader } from "@/components/flow-header"
import { routes } from "@/lib/routes"

export default function AddMoneyAchPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader
          title="Bank account details"
          backHref={routes.addMoney}
          description="Provide your bank account details below to your employer to set up direct deposit."
        />

        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
          <AccountDetailsList />
          <AchFundingNote />
          <ShareDetailsButton />
        </div>
      </main>
    </div>
  )
}
