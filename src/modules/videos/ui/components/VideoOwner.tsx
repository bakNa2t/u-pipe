import Link from "next/link";

import { UserAvatar } from "@/components/user-avatar";

import { VideoGetOneOutput } from "../../types";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
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
    </div>
  );
};
