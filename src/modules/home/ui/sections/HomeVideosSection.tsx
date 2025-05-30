"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { VideoGridCard } from "@/modules/videos/ui/components/VideoGridCard";
import { trpc } from "@/trpc/client";

import { DEFAULT_LIMIT } from "@/constants";

interface HomeVideosSectionProps {
  categoryId?: string;
}

export const HomeVideosSection = ({ categoryId }: HomeVideosSectionProps) => {
  return (
    <Suspense fallback={<HomeVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <HomeVideosSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const HomeVideosSectionSkeleton = () => {
  return <div>Loading</div>;
};

const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
  const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
    {
      categoryId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [media(min-width:1920px)]:grid-cols-5 [media(min-width:2200px)]:grid-cols-6">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
      </div>
    </div>
  );
};
