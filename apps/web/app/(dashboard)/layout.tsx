import { SendDraftProvider } from "@/components/send/send-draft-context"
import { WalletProvider } from "@/components/wallet/wallet-context"
import { AppSidebar } from "@/components/app-sidebar"
import { RequireAuth } from "@/components/auth/require-auth"
import { UserProvider } from "@/components/user/user-context"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { Toaster } from "@workspace/ui/components/sonner"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <TooltipProvider>
        <UserProvider>
          <WalletProvider>
            <SendDraftProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-background">{children}</SidebarInset>
              </SidebarProvider>
              <Toaster />
            </SendDraftProvider>
          </WalletProvider>
        </UserProvider>
      </TooltipProvider>
    </RequireAuth>
  )
}
