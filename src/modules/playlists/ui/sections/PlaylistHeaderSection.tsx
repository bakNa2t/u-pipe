import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PlaylistHeaderSectionProps {
  playlistId: string;
}

export const PlaylistHeaderSection = ({
  playlistId,
}: PlaylistHeaderSectionProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <PlaylistHeaderSectionSuspense playlistId={playlistId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const PlaylistHeaderSectionSuspense = ({
  playlistId,
}: PlaylistHeaderSectionProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          Custom playlist witt id: {playlistId}
        </h1>
        <p className="text-xs text-muted-foreground">
          Videos from the playlist
        </p>
      </div>

      <Button variant="outline" size="icon" className="rounded-full">
        <Trash2Icon />
      </Button>
    </div>
  );
};
