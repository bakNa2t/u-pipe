import { HydrateClient, trpc } from "@/trpc/server";

import { HomeView } from "@/modules/home/ui/views/HomeView";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Welcome to Upipe
      </h1>

      <HydrateClient>
        <HomeView categoryId={categoryId} />
      </HydrateClient>
    </div>
  );
};

export default Page;
