import { useTranslations } from "next-intl";

import { Skeleton } from "@/components/ui/skeleton";

import { PlaylistGetManyOutput } from "../../../types";

interface PlaylistInfoProps {
  data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="w-[90%] h-5" />
        <Skeleton className="w-[70%] h-5" />
        <Skeleton className="w-[50%] h-5" />
      </div>
    </div>
  );
};

export const PlaylistInfo = ({ data }: PlaylistInfoProps) => {
  const t = useTranslations("Playlists");

  return (
    <div className="flex gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words">
          {data.name}
        </h3>
        <p className="text-sm text-muted-foreground">{t("playlist")}</p>
        <p className="text-sm text-muted-foreground font-semibold hover:text-primary">
          {t("playlistDesc")}
        </p>
      </div>
    </div>
  );
};
