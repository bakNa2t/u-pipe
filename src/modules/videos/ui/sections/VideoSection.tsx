"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/utils";

import { VideoPlayer } from "../components/VideoPlayer";
import { VideoBanner } from "../components/VideoBanner";
import { VideoTopRow } from "../components/VideoTopRow";

interface VideoSectionProps {
  videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSuspense = ({ videoId }: VideoSectionProps) => {
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

  return (
    <>
      <div
        className={cn(
          "relative aspect-video bg-black rounded-xl overflow-hidden",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
          onPlay={() => {}}
        />
      </div>

      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
