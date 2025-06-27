"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItemsEng = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All playlists",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
];

const menuItemsRus = [
  {
    title: "История",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Понравившиеся видео",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "Все плейлисты",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
];

export const PersonalSection = () => {
  const clerkUser = useClerk();
  const pathname = usePathname();
  const locale = useLocale();
  const { isSignedIn } = useAuth();

  const t = useTranslations("Sidebar");
  //   const documentCookie =
  //     document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("UPIPE_TRANSLATION_LOCALE="))
  //       ?.split("=")[1] || navigator.language.slice(0, 2);

  //   if (!documentCookie) {
  //     setLocale(navigator.language.slice(0, 2));
  //   } else {
  //     setLocale(documentCookie);
  //   }
  // }, [locale]);

  const menuItems = locale === "en" ? menuItemsEng : menuItemsRus;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("you")}</SidebarGroupLabel>
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
