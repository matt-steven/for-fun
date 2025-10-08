interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasNext: boolean;
}

export const Pagination = ({ page, setPage, hasNext }: PaginationProps) => {
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-l">
        Prev
      </button>
      <span> Page {page} </span>
      <button onClick={() => setPage(page + 1)} disabled={!hasNext} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-r">
        Next
      </button>
    </div>
  );
};
