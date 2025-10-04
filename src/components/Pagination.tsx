interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasNext: boolean;
}

export const Pagination = ({ page, setPage, hasNext }: PaginationProps) => {
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <span> Page {page} </span>
      <button onClick={() => setPage(page + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};
