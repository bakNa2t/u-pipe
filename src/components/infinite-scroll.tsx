interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll = ({}: InfiniteScrollProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">InfiniteScroll</div>
  );
};
