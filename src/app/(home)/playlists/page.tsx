import { HydrateClient, trpc } from "@/trpc/server";

import { PlaylistsView } from "@/modules/playlists/ui/views/PlaylistsView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.playlists.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  );
};

export default Page;
