import { CategoriesSection } from "../sections/CategoriesSection";

interface SearchViewProps {
  query: string | undefined;
  categoryId: string | undefined;
}
export const SearchView = ({ query, categoryId }: SearchViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[1300px] mx-auto mb-10 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
    </div>
  );
};
