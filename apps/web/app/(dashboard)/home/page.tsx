import { AccountsCard } from "@/components/home/accounts-card"
import { RecentActivity } from "@/components/home/recent-activity"
import { DashboardHeader } from "@/components/dashboard-header"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader title="Banking" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-8 md:px-10 md:py-10">
        <AccountsCard />
        <RecentActivity />
      </main>
    </div>
  )
}
