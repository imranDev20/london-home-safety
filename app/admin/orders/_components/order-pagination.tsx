"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useQueryString from "@/hooks/use-query-string";
import { OrderWithRelation, Pagination as PaginationType } from "@/types/order";
import { usePathname, useRouter } from "next/navigation";

export function OrderPagination({
  orders,
  pagination,
}: {
  orders: OrderWithRelation[];
  pagination: PaginationType;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  const handlePageChange = (page: number) => {
    router.push(
      `${pathname}?${createQueryString({
        page: page.toString(),
      })}`
    );
  };

  const renderPageLinks = () => {
    const { currentPage, totalPages } = pagination;
    const pageLinks = [];

    // Always show first page
    pageLinks.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if there are more than 7 pages and we're not in the first 3 pages
    if (totalPages > 7 && currentPage > 3) {
      pageLinks.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show 5 pages around the current page
    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if there are more than 7 pages and we're not in the last 3 pages
    if (totalPages > 7 && currentPage < totalPages - 2) {
      pageLinks.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pageLinks.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  return (
    <div className="relative">
      <div className="text-xs text-muted-foreground absolute left-0 top-1/2 -translate-y-1/2">
        Showing <strong>{orders.length}</strong> of{" "}
        <strong>{pagination.totalCount}</strong> products
      </div>
      <Pagination className="mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                handlePageChange(Math.max(1, pagination.currentPage - 1))
              }
              className={
                pagination.currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          {renderPageLinks()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.totalPages, pagination.currentPage + 1)
                )
              }
              className={
                pagination.currentPage === pagination.totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
