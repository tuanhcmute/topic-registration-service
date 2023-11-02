import { useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

function Pagination({ onPageChange, pageCount }) {
  const itemPageClassName = `dark:text-gray-300 text-sm px-3 py-1 bg-whiteSmoke rounded-md dark:bg-transparent dark:border-gray-500 border dark:hover:bg-gray-500 cursor-pointer transition-all ease-in-out`;

  return (
    <ReactPaginate
      className='flex items-center gap-2'
      breakLabel='...'
      nextLabel='Trang cuối'
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel='Trang đầu'
      renderOnZeroPageCount={null}
      pageClassName={itemPageClassName}
      previousClassName={itemPageClassName}
      nextClassName={itemPageClassName}
    />
  );
}

export default Pagination;

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
