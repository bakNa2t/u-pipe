import { HydrateClient, trpc } from "@/trpc/server";

import { LikedView } from "@/modules/playlists/ui/views/LikedView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.playlists.getLiked.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <LikedView />
    </HydrateClient>
  );
};

export default Page;
