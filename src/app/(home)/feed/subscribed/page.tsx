import { useTranslations } from "next-intl";
import { HydrateClient, trpc } from "@/trpc/server";

import { SubscribedView } from "@/modules/home/ui/views/SubscribedView";

import { DEFAULT_LIMIT } from "@/constants";

export const dynamic = "force-dynamic";

interface TranslationsWrapperProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (t: any) => React.ReactNode;
}

const TranslationsWrapper = ({ children }: TranslationsWrapperProps) => {
  const t = useTranslations("Home");
  return children(t);
};

const Page = async () => {
  void trpc.videos.getManySubscribed.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        <TranslationsWrapper>{(t) => t("welcome")}</TranslationsWrapper>
      </h1>

      <HydrateClient>
        <SubscribedView />
      </HydrateClient>
    </div>
  );
};

export default Page;
