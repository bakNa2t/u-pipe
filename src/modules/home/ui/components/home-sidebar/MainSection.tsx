"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth, useClerk } from "@clerk/nextjs";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItemsEng = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Subscriptions",
    url: "/feed/subscribed",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Trending",
    url: "/feed/trending",
    icon: FlameIcon,
  },
];

const menuItemsRus = [
  {
    title: "Главная",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Подписки",
    url: "/feed/subscribed",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Тренды",
    url: "/feed/trending",
    icon: FlameIcon,
  },
];

export const MainSection = () => {
  const clerkUser = useClerk();
  const pathname = usePathname();
  const locale = useLocale();
  const { isSignedIn } = useAuth();

  const menuItems = locale === "en" ? menuItemsEng : menuItemsRus;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault();
                    return clerkUser.openSignIn();
                  }
                }}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
