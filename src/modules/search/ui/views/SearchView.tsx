import { CategoriesSection } from "../sections/CategoriesSection";
import { ResultsSection } from "../sections/ResultsSection";

interface SearchViewProps {
  query: string | undefined;
  categoryId: string | undefined;
}
export const SearchView = ({ query, categoryId }: SearchViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[1300px] mx-auto mb-10 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
      <ResultsSection query={query} categoryId={categoryId} />
    </div>
  );
};
