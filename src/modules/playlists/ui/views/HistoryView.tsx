import { HistoryVideosSection } from "../sections/HistoryVideosSection";

export const HistoryView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-xs text-muted-foreground">
          All videos you have watched
        </p>
      </div>
      <HistoryVideosSection />
    </div>
  );
};
