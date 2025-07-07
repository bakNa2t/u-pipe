import { useTranslations } from "next-intl";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionsButtonProps {
  isSubscribed: boolean;
  disabled?: boolean;
  className?: string;
  size?: ButtonProps["size"];
  onClick: ButtonProps["onClick"];
}

export const SubscriptionButton = ({
  isSubscribed,
  disabled,
  className,
  size,
  onClick,
}: SubscriptionsButtonProps) => {
  const t = useTranslations("Components");

  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-full", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isSubscribed ? t("unsubscribe") : t("subscribe")}
    </Button>
  );
};
