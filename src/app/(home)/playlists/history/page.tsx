import { HydrateClient, trpc } from "@/trpc/server";

import { HistoryView } from "@/modules/playlists/ui/views/HistoryView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.playlists.getHistory.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <HistoryView />
    </HydrateClient>
  );
};

export default Page;
