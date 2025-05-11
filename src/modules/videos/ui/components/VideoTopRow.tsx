import { VideoOwner } from "./VideoOwner";

import { VideoMenu } from "./VideoMenu";
import { VideoReactions } from "./VideoReactions";
import { VideoDescription } from "./VideoDescription";

import { VideoGetOneOutput } from "../../types";

interface VideoTopRowProps {
  video: VideoGetOneOutput;
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <VideoOwner user={video.user} videoId={video.id} />
        <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:mb-0 gap-2">
          <VideoReactions />
          <VideoMenu videoId={video.id} variant="secondary" />
        </div>
      </div>

      <VideoDescription
        compactViews="0"
        expandedViews="0"
        compactDate="01/01/2025"
        expandedDate="1st January 2025"
        description={video.description}
      />
    </div>
  );
};
