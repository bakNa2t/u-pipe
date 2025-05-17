"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { CommentForm } from "@/modules/comments/ui/components/CommentForm";
import { CommentItem } from "@/modules/comments/ui/components/CommentItem";
import { InfiniteScroll } from "@/components/infinite-scroll";

import { trpc } from "@/trpc/client";

import { DEFAULT_LIMIT } from "@/constants";

interface CommentsSectionProps {
  videoId: string;
}

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CommentsSectionSuspense = ({ videoId }: CommentsSectionProps) => {
  const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
    { videoId, limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="mt-6 ">
      <div className="flex flex-col gap-6">
        <h1>0 comments</h1>
        <CommentForm videoId={videoId} onSuccess={() => {}} />
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {comments.pages
          .flatMap((page) => page.items)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

        <InfiniteScroll
          isManual
          hasNextPage={query.hasNextPage}
          isFetchingNextPage={query.isFetchingNextPage}
          fetchNextPage={query.fetchNextPage}
        />
      </div>
    </div>
  );
};
