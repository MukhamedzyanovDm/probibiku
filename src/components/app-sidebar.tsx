"use client"

import * as React from "react"
import {
  Car,
  History,
  LayoutDashboard,
  PlusCircle,
  ScanLine,
  Settings,
  Share2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { MainLogo } from "@/components/MainLogo";
import Link from "next/link";

const data = {
  cars: [
    {
      name: "BMW X5 (X544TT)",
      url: "#",
      icon: Car,
      isActive: true,
    },
    {
      name: "Tesla Model 3",
      url: "#",
      icon: Car,
    },
  ],
  navMain: [
    {
      title: "Гараж",
      url: "/dashboard/garage",
      icon: LayoutDashboard,
    },
    {
      title: "История ТО",
      url: "/dashboard/history",
      icon: History,
    },
  ],
  actions: [
    {
      title: "Оцифровать чек",
      url: "#",
      icon: ScanLine,
    },
    {
      title: "Добавить запись",
      url: "#",
      icon: PlusCircle,
    },
    {
      title: "Поделиться",
      url: "#",
      icon: Share2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-4 py-6">
        <Link href="/dashboard/garage" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <MainLogo className="h-6 w-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Мой гараж</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.cars.map((car) => (
                <SidebarMenuItem key={car.name}>
                  <SidebarMenuButton asChild isActive={car.isActive}>
                    <a href={car.url}>
                      <car.icon />
                      <span>{car.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Быстрые действия</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.actions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton asChild>
                    <a href={action.url}>
                      <action.icon />
                      <span>{action.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <Settings />
                  <span>Настройки</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
