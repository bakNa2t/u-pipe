import { useTranslations } from "next-intl";
import { SubscribedVideosSection } from "../sections/SubscribedVideosSection";

export const SubscribedView = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">{t("subscribed")}</h1>
        <p className="text-xs text-muted-foreground">{t("subscribedDesc")}</p>
      </div>
      <SubscribedVideosSection />
    </div>
  );
};
