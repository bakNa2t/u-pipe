import Image from "next/image";
import { ListVideoIcon, PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";

interface PlaylistThumbnailProps {
  title: string;
  videoCount: number;
  imageUrl?: string | null;
  className?: string;
}

export const PlaylistThumbnail = ({
  title,
  videoCount,
  imageUrl,
  className,
}: PlaylistThumbnailProps) => {
  return (
    <div className={cn("relative pt-3 group", className)}>
      {/* Stack effect */}
      <div className="relative">
        {/* Background layers */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[97%] overflow-hidden rounded-xl bg-black/20 aspect-video" />
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[98.5%] overflow-hidden rounded-xl bg-black/25 aspect-video" />

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
            <span className="text-white  font-medium">Play all</span>
          </div>
        </div>
      </div>

      {/* Video count */}
      <div className="absolute bottom-2 right-2 flex items-center gap-x-1 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        <ListVideoIcon className="size-4" />
        {videoCount} videos
      </div>
    </div>
  );
};
