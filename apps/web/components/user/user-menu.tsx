"use client"

import Link from "next/link"
import { LogOutIcon, UserRoundIcon } from "lucide-react"

import { useAuth } from "@/components/auth/auth-context"
import { useUser } from "@/components/user/user-context"
import { routes } from "@/lib/routes"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

type UserMenuProps = {
  className?: string
}

export function UserMenu({ className }: UserMenuProps) {
  const { logout } = useAuth()
  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        )}
        aria-label="Account menu"
      >
        <Avatar size="default" className="rounded-md">
          <AvatarFallback className="rounded-md bg-foreground font-medium text-background">
            {user.initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60 rounded-md p-1">
        <div className="px-2 py-2">
          <span className="block truncate text-[13px] font-medium">{user.name}</span>
          <span className="block truncate text-[12px] font-normal text-muted-foreground">
            {user.phone}
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href={routes.more} />}
            className="gap-2 rounded-md px-2 py-2 text-[13px]"
          >
            <UserRoundIcon />
            Account
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={logout}
            className="gap-2 rounded-md px-2 py-2 text-[13px]"
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
