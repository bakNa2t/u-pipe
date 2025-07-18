import { UserAvatar } from "@/components/user-avatar";
import { SubscriptionButton } from "./SubscriptionButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

interface SubscriptionItemProps {
  name: string;
  imageUrl: string;
  subscriberCount: number;
  onUnsubscribe: () => void;
  disabled: boolean;
}

export const SubscriptionItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="size-10 rounded-full" />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-3 mt-1" />
          </div>

          <Skeleton className="w-20 h-8" />
        </div>
      </div>
    </div>
  );
};

export const SubscriptionItem = ({
  name,
  imageUrl,
  subscriberCount,
  onUnsubscribe,
  disabled,
}: SubscriptionItemProps) => {
  const t = useTranslations("Users");

  return (
    <div className="flex items-center gap-4">
      <UserAvatar size="lg" imageUrl={imageUrl} name={name} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm">{name}</h2>
            <p className="text-xs text-muted-foreground">
              {subscriberCount.toLocaleString()} {t("subscribers")}
            </p>
          </div>

          <SubscriptionButton
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onUnsubscribe();
            }}
            disabled={disabled}
            isSubscribed
          />
        </div>
      </div>
    </div>
  );
};
