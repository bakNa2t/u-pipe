"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogOutIcon, VideoIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { StudioSidebarHeader } from "./StudioSidebarHeader";

export const StudioSidebar = () => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  return (
    <Sidebar className="pt-16 border z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <StudioSidebarHeader />

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Content"
                isActive={pathname === "/studio"}
                asChild
              >
                <Link href="/studio">
                  <VideoIcon className="size-5" />
                  <span className="text-sm">{t("studioContent")}</span>
                </Link>
              </SidebarMenuButton>

              <Separator className="my-2" />

              <SidebarMenuButton tooltip="Exit studio" asChild>
                <Link href="/">
                  <LogOutIcon className="size-5" />
                  <span className="text-sm">{t("studioExit")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
