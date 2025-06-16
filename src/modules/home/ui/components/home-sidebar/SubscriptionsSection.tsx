"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

export const SubscriptionsSection = () => {
  const pathname = usePathname();
  const { data } = trpc.subscriptions.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.pages
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
