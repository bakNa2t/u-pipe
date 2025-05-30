import { CategoriesSection } from "../sections/CategoriesSection";
import { HomeVideosSection } from "../sections/HomeVideosSection";

interface HomeViewProps {
  categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
      <HomeVideosSection categoryId={categoryId} />
    </div>
  );
};
