import Link from "next/link";
import { useClerk, useAuth } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";

import { SubscriptionButton } from "@/modules/subscriptions/ui/components/SubscriptionButton";

import { cn } from "@/lib/utils";
import { UserGetOneOutput } from "../../types";
import { useSubscription } from "@/modules/subscriptions/hooks/useSubscription";

interface UserPageInfoProps {
  user: UserGetOneOutput;
}

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      {/* for mobile screen */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[60px] h-[60px] rounded-full" />

          <div className="flex-1 min-w-0">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-4 mt-1" />
          </div>
        </div>

        <Skeleton className="w-full h-10 mt-3 rounded-full" />
      </div>

      {/* for desktop screen */}
      <div className="hidden md:flex items-start gap-4">
        <Skeleton className="w-[160px] h-[160px] rounded-full" />

        <div className="flex-1 min-w-0">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-48 h-5 mt-4" />
          <Skeleton className="w-32 h-10 mt-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
  const clerk = useClerk();
  const { userId, isLoaded } = useAuth();
  const t = useTranslations("Users");

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

  return (
    <div className="py-6">
      {/* for mobile screen */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size="lg"
            imageUrl={user.imageUrl}
            name={user.name}
            className="w-[60px] h-[60px]"
            onClick={() => {
              if (user.clerkId === userId) {
                clerk.openUserProfile();
              }
            }}
          />

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>
                {user.ssubscriberCount} {t("subscribers")}
              </span>
              <span>&bull;</span>
              <span>
                {user.videoCount} {t("videos")}
              </span>
            </div>
          </div>
        </div>

        {userId === user.clerkId ? (
          <Button
            asChild
            variant="secondary"
            className="w-full mt-3 rounded-full"
          >
            <Link href="/studio">{t("btnGoToStudio")}</Link>
          </Button>
        ) : (
          <SubscriptionButton
            disabled={isPending || !isLoaded}
            isSubscribed={user.viewerSubscribed}
            onClick={onClick}
            className="w-full mt-3"
          />
        )}
      </div>

      {/* for desktop screen */}
      <div className="hidden items-start gap-4 md:flex">
        <UserAvatar
          size="xl"
          imageUrl={user.imageUrl}
          name={user.name}
          className={cn(
            userId === user.clerkId &&
              "cursor-pointer hover:opacity-80 transition-opacity duration-300"
          )}
          onClick={() => {
            if (user.clerkId === userId) {
              clerk.openUserProfile();
            }
          }}
        />

        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
            <span>
              {user.ssubscriberCount} {t("subscribers")}
            </span>
            <span>&bull;</span>
            <span>
              {user.videoCount} {t("videos")}
            </span>
          </div>

          {userId === user.clerkId ? (
            <Button asChild variant="secondary" className="mt-3 rounded-full">
              <Link href="/studio">{t("btnGoToStudio")}</Link>
            </Button>
          ) : (
            <SubscriptionButton
              disabled={isPending || !isLoaded}
              isSubscribed={user.viewerSubscribed}
              onClick={onClick}
              className="mt-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
