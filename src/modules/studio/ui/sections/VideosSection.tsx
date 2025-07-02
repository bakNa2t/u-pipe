"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Globe2Icon, LockIcon } from "lucide-react";
import { format } from "date-fns";

import { InfiniteScroll } from "@/components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { VideoThumbnail } from "@/modules/videos/ui/components/VideoThumbnail";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { snakeCaseToTitle } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSkeleton = () => {
  const t = useTranslations("Studio");
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px] pl-6">
                {t("headerVideo")}
              </TableHead>
              <TableHead>{t("headerVisibility")}</TableHead>
              <TableHead>{t("headerStatus")}</TableHead>
              <TableHead>{t("headerDate")}</TableHead>
              <TableHead className="text-right">{t("headerVews")}</TableHead>
              <TableHead className="text-right">
                {t("headerComments")}
              </TableHead>
              <TableHead className="text-right pr-6">
                {t("headerLikes")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-36 h-20" />

                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-[100px] h-4" />
                      <Skeleton className="w-[150px] h-3" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>

                <TableCell>
                  <Skeleton className="w-16 h-4" />
                </TableCell>

                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="w-12 h-4 ml-auto" />
                </TableCell>

                <TableCell className="text-right">
                  <Skeleton className="w-12 h-4 ml-auto" />
                </TableCell>

                <TableCell className="text-right pr-6">
                  <Skeleton className="w-12 h-4 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const t = useTranslations("Studio");

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px] pl-6">
                {t("headerVideo")}
              </TableHead>
              <TableHead>{t("headerVisibility")}</TableHead>
              <TableHead>{t("headerStatus")}</TableHead>
              <TableHead>{t("headerDate")}</TableHead>
              <TableHead className="text-right">{t("headerVews")}</TableHead>
              <TableHead className="text-right">
                {t("headerComments")}
              </TableHead>
              <TableHead className="text-right pr-6">
                {t("headerLikes")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  href={`/studio/videos/${video.id}`}
                  key={video.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-36 shrink-0">
                          <VideoThumbnail
                            title={video.title}
                            duration={video.duration || 0}
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.previewUrl}
                          />
                        </div>

                        <div className="flex flex-col overflow-hidden gap-y-1">
                          <span className="text-sm line-clamp-1">
                            {video.title}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {video.description || t("noDescription")}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {video.visibility === "private" ? (
                          <LockIcon className="size-4 mr-2" />
                        ) : (
                          <Globe2Icon className="size-4 mr-2" />
                        )}
                        {snakeCaseToTitle(video.visibility)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {snakeCaseToTitle(video.muxStatus || "Error")}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm truncate">
                      {format(new Date(video.createdAt), "d MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {video.viewCount}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {video.commentCount}
                    </TableCell>
                    <TableCell className="text-right text-sm pr-6">
                      {video.likeCount}
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>

      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
