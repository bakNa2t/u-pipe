import { SubscribedVideosSection } from "../sections/SubscribedVideosSection";

export const SubscribedView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">Subscribed</h1>
        <p className="text-xs text-muted-foreground">
          Videos from your favorite subscriptions
        </p>
      </div>
      <SubscribedVideosSection />
    </div>
  );
};
