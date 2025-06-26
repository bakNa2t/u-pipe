import { HydrateClient, trpc } from "@/trpc/server";
import { useTranslations } from "next-intl";

import { HomeView } from "@/modules/home/ui/views/HomeView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

interface TranslationsWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (t: any) => React.ReactNode;
}

const TranslationsWrapper = ({ children }: TranslationsWrapperProps) => {
  const t = useTranslations("Home");
  return children(t);
};

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  void trpc.videos.getMany.prefetchInfinite({
    categoryId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        <TranslationsWrapper>{(t) => t("welcome")}</TranslationsWrapper>
      </h1>

      <HydrateClient>
        <HomeView categoryId={categoryId} />
      </HydrateClient>
    </div>
  );
};

export default Page;
