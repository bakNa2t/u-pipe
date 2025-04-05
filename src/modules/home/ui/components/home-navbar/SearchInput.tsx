import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-12 py-2 rounded-l-full border focus:outline-none focus:border-violet-900"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 rounded-r-full bg-violet-900/40 border-l-0 hover:bg-violet-900/60 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
