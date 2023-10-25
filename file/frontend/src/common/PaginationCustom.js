import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationCustom({ currentPage, totalPages, onPageChange }) {


    const pageRange = 3;

    const startPage = Math.max(1, currentPage - pageRange);

    const endPage = Math.min(totalPages, currentPage + pageRange);

    // Generate the list of pagination items
    const items = [];
    for (let page = startPage; page <= endPage; page++) {
        items.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    return (
        <Pagination size="sm" className='justify-content-end'>
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            />
            {items}
            <Pagination.Next
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            />
            <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
    );
}

export default PaginationCustom;
