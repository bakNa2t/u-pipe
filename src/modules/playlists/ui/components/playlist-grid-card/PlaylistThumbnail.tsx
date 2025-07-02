import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ListVideoIcon, PlayIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";

interface PlaylistThumbnailProps {
  title: string;
  videoCount: number;
  imageUrl?: string | null;
  className?: string;
}

export const PlaylistThumbnailSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

export const PlaylistThumbnail = ({
  title,
  videoCount,
  imageUrl,
  className,
}: PlaylistThumbnailProps) => {
  const t = useTranslations("Playlists");

  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(videoCount);
  }, [videoCount]);

  return (
    <div className={cn("relative pt-3", className)}>
      {/* Stack effect */}
      <div className="relative">
        {/* Background layers */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[97%] overflow-hidden rounded-xl bg-black/20 dark:bg-white/15 aspect-video" />
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[98.5%] overflow-hidden rounded-xl bg-black/25 dark:bg-white/10 aspect-video" />

        {/* Main thumbnail */}
        <div className="relative w-full rounded-xl overflow-hidden aspect-video">
          <Image
            src={imageUrl || THUMBNAIL_FALLBACK}
            alt={title}
            className="w-full h-full object-cover"
            fill
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute flex items-center justify-center inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <div className="flex items-center gap-x-2">
            <PlayIcon className="size-4 text-white fill-white" />
            <span className="text-white font-medium">{t("playAll")}</span>
          </div>
        </div>
      </div>

      {/* Video count */}
      <div className="absolute bottom-2 right-2 flex items-center gap-x-1 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        <ListVideoIcon className="size-4" />
        {compactViews} {t("videos")}
      </div>
    </div>
  );
};
