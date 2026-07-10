"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CreditCardIcon,
  HomeIcon,
  SendIcon,
  TrendingUpIcon,
} from "lucide-react"

import { useAuth } from "@/components/auth/auth-context"
import { ManaLogo } from "@/components/mana-logo"
import { useUser } from "@/components/user/user-context"
import { routes } from "@/lib/routes"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

const navItems = [
  { title: "Home", href: routes.home, icon: HomeIcon },
  { title: "Send", href: routes.send, icon: SendIcon },
  { title: "Card", href: routes.card, icon: CreditCardIcon },
  { title: "Save", href: routes.save, icon: TrendingUpIcon },
] as const

function getProfileLabel(email: string | undefined, name: string) {
  if (!email) return name
  return email.split("@")[0] ?? name
}

export function AppSidebar() {
  const pathname = usePathname()
  const { session } = useAuth()
  const { user } = useUser()
  const profileLabel = getProfileLabel(session?.email, user.name)

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="gap-1 px-4 pt-6 pb-4">
        <ManaLogo className="group-data-[collapsible=icon]:hidden" />
        <span className="hidden text-lg font-semibold group-data-[collapsible=icon]:block">
          M
        </span>
        <span className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
          Manage your wealth
        </span>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === routes.home
                    ? pathname === routes.home
                    : pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-10 rounded-xl px-3 data-active:bg-transparent data-active:font-medium data-active:text-primary data-active:hover:bg-transparent"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href={routes.more} />}
              isActive={pathname === routes.more}
              tooltip="Profile"
              className="h-12 rounded-xl px-2 data-active:bg-muted/60"
            >
              <Avatar size="sm" className="rounded-md">
                <AvatarFallback className="rounded-md bg-foreground text-[11px] font-medium text-background">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
                <span className="truncate text-[13px] font-medium">
                  {profileLabel}
                </span>
                <span className="truncate text-[11px] font-normal text-muted-foreground">
                  {session?.email ?? user.phone}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
