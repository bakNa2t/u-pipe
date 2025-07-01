import { useTranslations } from "next-intl";
import { SubscriptionsSection } from "../sections/SubscriptionsSection";

export const SubscriptionsView = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">{t("allSubscriptions")}</h1>
        <p className="text-xs text-muted-foreground">
          {t("allSubscriptionsDesc")}
        </p>
      </div>
      <SubscriptionsSection />
    </div>
  );
};
