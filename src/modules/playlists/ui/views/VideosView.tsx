import { PlaylistHeaderSection } from "../sections/PlaylistHeaderSection";
import { VideosSection } from "../sections/VideosSection";

interface VideosViewProps {
  playlistId: string;
}

export const VideosView = ({ playlistId }: VideosViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <PlaylistHeaderSection playlistId={playlistId} />
      <VideosSection playlistId={playlistId} />
    </div>
  );
};
