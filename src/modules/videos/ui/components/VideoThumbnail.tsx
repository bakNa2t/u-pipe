import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { formatDuration } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "../../constants";

interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
}

export const VideoThumbnailSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

export const VideoThumbnail = ({
  title,
  duration,
  imageUrl,
  previewUrl,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl || THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl || THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="w-full h-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* duration box */}
      <div className="absolute bottom-1 right-2 px-1 py-0.5 rounded bg-black/80 text-xs text-white font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
