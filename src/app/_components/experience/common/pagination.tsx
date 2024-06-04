import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-x-4 mt-8">
      {[...Array(totalPages).keys()].map((index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full hover:bg-[#008B6B] ${
              currentPage === pageNumber ? 'font-bold' : ''
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
