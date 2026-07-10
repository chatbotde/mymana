"use client"

import {
  CircleHelpIcon,
  FileTextIcon,
  LogOutIcon,
} from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth/auth-context"
import { FlowHeader } from "@/components/flow-header"
import { useUser } from "@/components/user/user-context"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"

const menuItems = [
  { id: "about", label: "About", icon: FileTextIcon },
  { id: "help", label: "Help & Support", icon: CircleHelpIcon },
] as const

export function AccountView() {
  const { logout, session } = useAuth()
  const { user } = useUser()

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <FlowHeader title="Profile" backHref={routes.home} />

        <section className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-[18px] font-semibold text-primary-foreground">
            {user.initials}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold tracking-tight text-foreground">
              {user.name}
            </h2>
            <p className="text-[13px] text-muted-foreground">
              {session?.email ?? user.phone}
            </p>
          </div>
        </section>

        <Button
          type="button"
          className="h-10 w-full rounded-full text-[13px] font-medium"
          onClick={() => toast.success("Invite link copied")}
        >
          Invite & earn $25
        </Button>

        <section className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toast.message(`${item.label} coming soon`)}
              className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-border py-3.5 text-left transition-colors hover:bg-muted/40"
            >
              <item.icon className="size-4 text-muted-foreground" />
              <span className="text-[13px] font-medium text-foreground">
                {item.label}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={logout}
            className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-border py-3.5 text-left transition-colors last:border-b-0 hover:bg-muted/40"
          >
            <LogOutIcon className="size-4 text-muted-foreground" />
            <span className="text-[13px] font-medium text-foreground">
              Log out
            </span>
          </button>
        </section>

        <p className="text-center text-[12px] text-muted-foreground">
          Version • 0.2.0
        </p>
      </main>
    </div>
  )
}
