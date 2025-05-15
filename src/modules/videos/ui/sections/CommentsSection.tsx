"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { CommentForm } from "@/modules/comments/ui/components/CommentForm";

import { trpc } from "@/trpc/client";

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
  const [commnets] = trpc.comments.getManu.useSuspenseQuery({ videoId });
  console.log(commnets);

  return (
    <div className="mt-6 ">
      <div className="flex flex-col gap-6">
        <h1>0 comments</h1>
        <CommentForm videoId={videoId} onSuccess={() => {}} />
      </div>
    </div>
  );
};
