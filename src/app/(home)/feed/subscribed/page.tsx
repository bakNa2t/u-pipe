import { HydrateClient, trpc } from "@/trpc/server";

import { SubscribedView } from "@/modules/home/ui/views/SubscribedView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.videos.getManySubscribed.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Welcome to Upipe
      </h1>

      <HydrateClient>
        <SubscribedView />
      </HydrateClient>
    </div>
  );
};

export default Page;
