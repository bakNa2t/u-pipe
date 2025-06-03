import { LikedVideosSection } from "../sections/LikedVideosSection";

export const LikedView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 px-4 pt-2.5">
      <div>
        <h1 className="text-2xl font-bold">Liked</h1>
        <p className="text-xs text-muted-foreground">
          All videos you have liked
        </p>
      </div>
      <LikedVideosSection />
    </div>
  );
};
