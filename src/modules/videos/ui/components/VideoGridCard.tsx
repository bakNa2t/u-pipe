import Link from "next/link";

import { VideoInfo, VideoInfoSkeleton } from "./VideoInfo";
import { VideoThumbnail, VideoThumbnailSkeleton } from "./VideoThumbnail";

import { VideoGetManyOutput } from "../../types";

interface VideoGridCardProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoGridCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <VideoThumbnailSkeleton />
      <VideoInfoSkeleton />
    </div>
  );
};

export const VideoGridCard = ({ data, onRemove }: VideoGridCardProps) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <Link href={`/videos/${data.id}`}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        />
      </Link>

      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
};
