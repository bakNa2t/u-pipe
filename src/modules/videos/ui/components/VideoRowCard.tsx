import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { cva, VariantProps } from "class-variance-authority";

import { UserAvatar } from "@/components/user-avatar";
import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { VideoMenu } from "./VideoMenu";
import { VideoThumbnail, VideoThumbnailSkeleton } from "./VideoThumbnail";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { VideoGetManyOutput } from "../../types";

const videoRowCardVariants = cva("group flex min-w-0", {
  variants: {
    size: {
      default: "gap-4",
      compact: "gap-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const thumbnailVariants = cva("relative flex-none", {
  variants: {
    size: {
      default: "w-[38%]",
      compact: "w-[168px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariants> {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoRowCardSkeleton = ({
  size = "default",
}: VariantProps<typeof videoRowCardVariants>) => {
  return (
    <div className={videoRowCardVariants({ size })}>
      {/* for thumbnail */}
      <div className={thumbnailVariants({ size })}>
        <VideoThumbnailSkeleton />
      </div>

      {/* for video info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-x-2">
          <div className="flex-1 min-w-0">
            <Skeleton
              className={cn("w-[40%] h-5", size === "compact" && "w-[40%] h-4")}
            />

            {size === "default" && (
              <>
                <Skeleton className="w-[20%] h-4 mt-1" />
                <div className="flex items-center gap-2 my-3">
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </>
            )}

            {size === "compact" && (
              <>
                <Skeleton className="w-[40%] h-4 mt-1" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideoRowCard = ({
  data,
  size = "default",
  onRemove,
}: VideoRowCardProps) => {
  const t = useTranslations("Videos");

  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  const compactLikes = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.likeCount);
  }, [data.likeCount]);

  return (
    <div className={videoRowCardVariants({ size })}>
      <Link href={`/videos/${data.id}`} className={thumbnailVariants({ size })}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        />
      </Link>

      {/* Video details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-x-2">
          <Link href={`/videos/${data.id}`} className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-medium line-clamp-2",
                size === "compact" ? "text-sm" : "text-base"
              )}
            >
              {data.title}
            </h3>

            {size === "default" && (
              <p className="text-sm text-muted-foreground mt-1">
                {compactViews} {t("views")} &bull; {compactLikes} {t("likes")}
              </p>
            )}

            {size === "default" && (
              <>
                <div className="flex items-center gap-2 my-3">
                  <UserAvatar
                    size="sm"
                    imageUrl={data.user.imageUrl}
                    name={data.user.name}
                  />

                  <UserInfo size="sm" name={data.user.name} />
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="w-fit text-xs text-muted-foreground line-clamp-2">
                      {data.description ?? t("noDescription")}
                    </p>
                  </TooltipTrigger>

                  <TooltipContent
                    side="bottom"
                    align="center"
                    className="bg-black/70 dark:bg-black/10"
                  >
                    <p>{t("tooltipDesc")}</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}

            {size === "compact" && <UserInfo size="sm" name={data.user.name} />}

            {size === "compact" && (
              <p className="text-sm text-muted-foreground mt-1">
                {compactViews} {t("views")} &bull; {compactLikes} {t("likes")}
              </p>
            )}
          </Link>

          <div className="flex-none">
            <VideoMenu videoId={data.id} onRemove={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};
