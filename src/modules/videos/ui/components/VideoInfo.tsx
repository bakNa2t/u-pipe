import Link from "next/link";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";

import { UserAvatar } from "@/components/user-avatar";
import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoMenu } from "./VideoMenu";

import { VideoGetManyOutput } from "../../types";

interface VideoInfoProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="flex-shrink-0 rounded-full size-10" />
      <div className="flex-1 min-w-0 space-y-1">
        <Skeleton className="w-[90%] h-5" />
        <Skeleton className="w-[70%] h-5" />
      </div>
    </div>
  );
};

export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
  const t = useTranslations("Videos");

  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(data.createdAt, { addSuffix: true });
  }, [data.createdAt]);

  return (
    <div className="flex gap-3">
      <Link href={`/users/${data.user.id}`}>
        <UserAvatar imageUrl={data.user.imageUrl} name={data.user.name} />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/videos/${data.id}`}>
          <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
          </h3>
        </Link>

        <Link href={`/users/${data.user.id}`}>
          <UserInfo name={data.user.name} />
        </Link>

        <Link href={`/videos/${data.id}`}>
          <p className="text-sm text-gray-500 line-clamp-1">
            {compactViews} {t("views")} &bull; {compactDate}
          </p>
        </Link>
      </div>

      <div className="flex-shrink-0">
        <VideoMenu videoId={data.id} onRemove={onRemove} />
      </div>
    </div>
  );
};
