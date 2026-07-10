"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CreditCardIcon,
  HomeIcon,
  SendIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"

import { ManaLogo } from "@/components/mana-logo"
import { routes } from "@/lib/routes"
import { Button } from "@workspace/ui/components/button"
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

export function AppSidebar() {
  const pathname = usePathname()

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

      <SidebarFooter className="p-4">
        <Button
          nativeButton={false}
          render={<Link href={routes.account} />}
          className="h-11 w-full rounded-full text-sm font-medium"
        >
          <WalletIcon data-icon="inline-start" />
          Account
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
