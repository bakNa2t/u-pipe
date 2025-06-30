import { useTranslations } from "next-intl";

import { VideosSection } from "../sections/VideosSection";

export const StudioView = () => {
  const t = useTranslations("Studio");

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <div className="px-4">
        <h1 className="text-2xl font-bold">{t("channelContent")}</h1>
        <p className="text-xs text-muted-foreground">
          {t("channelContentDesc")}
        </p>
      </div>

      <VideosSection />
    </div>
  );
};
