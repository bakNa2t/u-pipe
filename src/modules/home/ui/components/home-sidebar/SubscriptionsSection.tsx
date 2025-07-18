"use client";

import Link from "next/link";
import { ListIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

export const SubscriptionsSectionLoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton disabled>
            <Skeleton className="size-6 rounded-full shrink-0" />
            <Skeleton className="w-full h-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export const SubscriptionsSection = () => {
  const pathname = usePathname();
  const { data, isLoading } = trpc.subscriptions.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const t = useTranslations("Sidebar");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("subscriptions")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading && <SubscriptionsSectionLoadingSkeleton />}

          {!isLoading &&
            data?.pages
              .flatMap((page) => page.items)
              .map((subscription) => (
                <SidebarMenuItem
                  key={`${subscription.creatorId}-${subscription.viewerId}`}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={subscription.user.name}
                    isActive={pathname === `/users/${subscription.user.id}`}
                  >
                    <Link
                      href={`/users/${subscription.user.id}`}
                      className="flex items-center gap-4"
                    >
                      <UserAvatar
                        size="xs"
                        imageUrl={subscription.user.imageUrl}
                        name={subscription.user.name}
                      />
                      <span className="text-sm">{subscription.user.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

          {!isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/subscriptions"}
              >
                <Link href="/subscriptions" className="flex items-center gap-4">
                  <ListIcon className="size-4" />
                  <span className="text-sm">{t("allSubscriptions")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
