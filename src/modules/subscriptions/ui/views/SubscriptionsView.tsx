import { SubscriptionsSection } from "../sections/SubscriptionsSection";

export const SubscriptionsView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">All subscriptions</h1>
        <p className="text-xs text-muted-foreground">
          View and manage all your subscriptions
        </p>
      </div>
      <SubscriptionsSection />
    </div>
  );
};
