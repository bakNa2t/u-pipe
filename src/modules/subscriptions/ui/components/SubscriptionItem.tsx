import { UserAvatar } from "@/components/user-avatar";
import { SubscriptionButton } from "./SubscriptionButton";

interface SubscriptionItemProps {
  name: string;
  imageUrl: string;
  subscriberCount: number;
  onUnsubscribe: () => void;
  disabled: boolean;
}
export const SubscriptionItem = ({
  name,
  imageUrl,
  subscriberCount,
  onUnsubscribe,
  disabled,
}: SubscriptionItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <UserAvatar size="lg" imageUrl={imageUrl} name={name} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm">{name}</h2>
            <p className="text-xs text-muted-foreground">
              {subscriberCount.toLocaleString()} subscribers
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
