import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import { SubscriptionButton } from "@/modules/subscriptions/ui/components/SubscriptionButton";

import { VideoGetOneOutput } from "../../types";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const { userId: clerkUserId } = useAuth();

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3">
      <Link href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar imageUrl={user.imageUrl} name={user.name} size="lg" />
          <span className="text-sm text-muted-foreground line-clamp-1">
            {0} subscribers
          </span>
        </div>
      </Link>

      {clerkUserId === user.clerkId ? (
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/studio/videos/${videoId}`}>Edit video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          isSubscribed={false}
          className="flex-none"
          onClick={() => {}}
          disabled={false}
        />
      )}
    </div>
  );
};
