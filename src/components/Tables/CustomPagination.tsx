import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type CustomPaginationProps = {
  page: number;
  pageSize?: number;
  totalItems: number;
  pageChange: (page: number) => void;
};

const CustomPagination = ({
  page,
  pageSize = 5,
  totalItems,
  pageChange,
}: CustomPaginationProps) => {
  const onPageChange = (page: number) => {
    if (page < 0 || page + 1 > Math.ceil(totalItems / pageSize)) {
      return;
    }
    pageChange(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(page - 1)} />
        </PaginationItem>
        {totalItems > pageSize &&
          Array.from(
            {
              length: Math.ceil(totalItems / pageSize),
            },
            (_, i) => {
              const shouldBeVisible = Math.abs(i - page);
              if (shouldBeVisible < 3)
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i}
                      onClick={() => onPageChange(i)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
            }
          )}

        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
