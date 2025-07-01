import { useTranslations } from "next-intl";
import { HistoryVideosSection } from "../sections/HistoryVideosSection";

export const HistoryView = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">{t("history")}</h1>
        <p className="text-xs text-muted-foreground">{t("historyDesc")}</p>
      </div>
      <HistoryVideosSection />
    </div>
  );
};
