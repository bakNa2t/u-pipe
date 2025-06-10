"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/VideoGridCard";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "@/modules/videos/ui/components/VideoRowCard";
import { InfiniteScroll } from "@/components/infinite-scroll";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

interface VideosSectionProps {
  playlistId: string;
}

export const VideosSection = ({ playlistId }: VideosSectionProps) => {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense playlistId={playlistId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} size="compact" />
        ))}
      </div>
    </div>
  );
};

const VideosSectionSuspense = ({ playlistId }: VideosSectionProps) => {
  const [videos, query] = trpc.playlists.getVideos.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      playlistId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
      </div>

      <div className="hidden flex-col gap-4 md:flex">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoRowCard key={video.id} data={video} size="compact" />
          ))}
      </div>

      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
