import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/SubscriptionButton";
import { useSubscription } from "@/modules/subscriptions/hooks/useSubscription";

import { VideoGetOneOutput } from "../../types";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const { userId: clerkUserId, isLoaded } = useAuth();

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
    fromVideoId: videoId,
  });

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3">
      <Link href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar imageUrl={user.imageUrl} name={user.name} size="lg" />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo size="lg" name={user.name} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {user.subscriberCount} subscribers
            </span>
          </div>
        </div>
      </Link>

      {clerkUserId === user.clerkId ? (
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/studio/videos/${videoId}`}>Edit video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          isSubscribed={user.viewerSubscribed}
          className="flex-none"
          onClick={onClick}
          disabled={isPending || !isLoaded}
        />
      )}
    </div>
  );
};
