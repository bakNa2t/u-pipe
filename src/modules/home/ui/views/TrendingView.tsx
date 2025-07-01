import { useTranslations } from "next-intl";
import { TrendingVideosSection } from "../sections/TrendingVideosSection";

export const TrendingView = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">{t("trending")}</h1>
        <p className="text-xs text-muted-foreground">{t("trendingDesc")}</p>
      </div>
      <TrendingVideosSection />
    </div>
  );
};
