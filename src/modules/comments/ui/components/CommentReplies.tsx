import { trpc } from "@/trpc/client";
import { useTranslations } from "next-intl";
import { CornerDownRightIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CommentItem } from "./CommentItem";

import { DEFAULT_LIMIT } from "@/constants";

interface CommentRepliesProps {
  parentId: string;
  videoId: string;
}

export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.comments.getMany.useInfiniteQuery(
      {
        parentId,
        videoId,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const t = useTranslations("Comments");

  return (
    <div className="pl-14">
      <div className="flex flex-col gap-4 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading &&
          data?.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} variant="reply" />
            ))}
      </div>

      {hasNextPage && (
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          <CornerDownRightIcon />
          {t("showMoreReplies")}
        </Button>
      )}
    </div>
  );
};
