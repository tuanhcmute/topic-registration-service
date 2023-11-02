import { useState } from "react";
import ReactPaginate from "react-paginate";

function PaginatedItems({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log(currentItems);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      className='flex items-center gap-2'
      breakLabel='...'
      nextLabel='Trang cuối'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel='Trang đầu'
      renderOnZeroPageCount={null}
      pageClassName='dark:text-gray-300 text-sm px-3 py-1 bg-whiteSmoke rounded-md dark:bg-transparent dark:border-gray-500 border dark:hover:bg-gray-500 cursor-pointer transition-all ease-in-out'
      previousClassName='dark:text-gray-300 text-sm px-3 py-1 bg-whiteSmoke rounded-md dark:bg-transparent dark:border-gray-500 border dark:hover:bg-gray-500 cursor-pointer transition-all ease-in-out'
      nextClassName='dark:text-gray-300 text-sm px-3 py-1 bg-whiteSmoke rounded-md dark:bg-transparent dark:border-gray-500 border dark:hover:bg-gray-500 cursor-pointer transition-all ease-in-out'
      activeClassName='dark:text-red-500'
    />
  );
}

export default PaginatedItems;
