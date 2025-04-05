export const SearchInput = () => {
  return (
    <form>
      <div className="flex w-full max-w-[600px]">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-12 py-2 rounded-l-full border focus:outline-none focus:border-violet-900"
          />
        </div>
      </div>
    </form>
  );
};
