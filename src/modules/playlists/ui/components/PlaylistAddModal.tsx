import { useTranslations } from "next-intl";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/responsive-modal";
import { InfiniteScroll } from "@/components/infinite-scroll";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { toast } from "sonner";

interface PlaylistAddModalProps {
  open: boolean;
  videoId: string;
  onOpenChange: (open: boolean) => void;
}

export const PlaylistAddModal = ({
  open,
  videoId,
  onOpenChange,
}: PlaylistAddModalProps) => {
  const utils = trpc.useUtils();
  const {
    data: playlists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = trpc.playlists.getManyForVideo.useInfiniteQuery(
    {
      videoId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!videoId && open,
    }
  );

  const t = useTranslations("Playlists");
  const tToast = useTranslations("Toast");

  const addVideo = trpc.playlists.addVideo.useMutation({
    onSuccess: (data) => {
      toast.success(tToast("videoAddedToPlaylist"));
      utils.playlists.getMany.invalidate();
      utils.playlists.getManyForVideo.invalidate({ videoId });
      utils.playlists.getOne.invalidate({ id: data.playlistId });
      utils.playlists.getVideos.invalidate({ playlistId: data.playlistId });
    },
    onError: () => {
      toast.error(tToast("failedToAddVideoToPlaylist"));
    },
  });

  const removeVideo = trpc.playlists.removeVideo.useMutation({
    onSuccess: (data) => {
      toast.success(tToast("videoRemovedFromPlaylist"));
      utils.playlists.getMany.invalidate();
      utils.playlists.getManyForVideo.invalidate({ videoId });
      utils.playlists.getOne.invalidate({ id: data.playlistId });
      utils.playlists.getVideos.invalidate({ playlistId: data.playlistId });
    },
    onError: () => {
      toast.error(tToast("failedToRemoveVideoFromPlaylist"));
    },
  });

  return (
    <ResponsiveModal
      title={t("modalAddPlaylistTitle")}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-2">
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoading &&
          playlists?.pages
            .flatMap((page) => page.items)
            .map((playlist) => (
              <Button
                key={playlist.id}
                variant="ghost"
                className="justify-start w-full px-2 [&_svg]:size-5"
                size="lg"
                onClick={() => {
                  if (playlist.containsVideo) {
                    removeVideo.mutate({ playlistId: playlist.id, videoId });
                  } else {
                    addVideo.mutate({ playlistId: playlist.id, videoId });
                  }
                }}
                disabled={addVideo.isPending || removeVideo.isPending}
              >
                {playlist.containsVideo ? (
                  <SquareCheckIcon className="mr-2" />
                ) : (
                  <SquareIcon className="mr-2" />
                )}
                {playlist.name}
              </Button>
            ))}

        {!isLoading && (
          <InfiniteScroll
            isManual
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </ResponsiveModal>
  );
};
