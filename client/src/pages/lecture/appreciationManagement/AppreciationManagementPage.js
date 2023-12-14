import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";

import { topicType } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchDivisionByTopicType } from "../../../features/division";
import { PaginatedItems } from "../../../components/pagination";

function AppreciationManagementPage() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("createdDate");
  const enrollmentPeriod = useSelector(
    (state) => state.enrollmentPeriod?.enrollmentPeriod
  );
  const divisions = useSelector((state) => state.division?.divisions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDivisionByTopicType(topicType.TLCN));
  }, [dispatch, itemsPerPage, pageNumber, sortBy]);

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            PHẢN BIỆN TIỂU LUẬN CHUYÊN NGÀNH
          </span>
          <Button color='gray' className='rounded-md p-0'>
            Xuất Excel
          </Button>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='m-3 border border-gray-400 py-2 px-3 rounded text-sm truncate dark:text-gray-300'>
          {enrollmentPeriod?.name}
        </div>
        {/* End select */}
        {/* Table */}
        <div className='p-3'>
          <div className='overflow-x-auto'>
            <div className='bg-gray-100 flex items-center justify-center font-Roboto'>
              <div className='w-full'>
                <div className='bg-white shadow-md'>
                  <table className='min-w-max w-full table-auto'>
                    <thead>
                      <tr className='bg-gray-200 text-gray-600 text-sm leading-normal p-3 dark:bg-sambuca dark:text-gray-300'>
                        <th className='p-3 text-center border-collapse border'>
                          STT
                        </th>
                        <th className='p-3 text-center border'>
                          Đề tài phản biện
                        </th>
                        <th className='p-3 text-center border'>GVHD</th>
                        <th className='p-3 text-center border'>Thời gian</th>
                        <th className='p-3 text-center border'>Phòng</th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {divisions?.map((item, index) => {
                        return (
                          <tr
                            className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'
                            key={item.id}
                          >
                            <td className='p-3 text-center whitespace-nowrap border'>
                              {index + 1}
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                              <p className='font-normal'>{item?.topic?.name}</p>
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey'>
                              <span className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                {item?.topic?.lecture?.ntid}
                              </span>
                              <span className='block mt-2 font-normal'>
                                {item?.topic?.lecture?.name}
                              </span>
                            </td>
                            <td className='p-3 border border-collapse border-lightGrey'>
                              <div className='flex flex-col gap-2'>
                                <span className='bg-green-200 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl block w-fit'>
                                  {item?.specifiedTime}
                                </span>
                                <span className='bg-red-300 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl w-fit'>
                                  {item?.startDate}
                                </span>
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                {item?.place}
                              </span>
                            </td>
                            <td className='border border-collapse border-lightGrey'>
                              <div className='flex justify-center'>
                                <LiaEditSolid className='w-6 h-6 cursor-pointer' />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end p-3'>
          {/* <Pagination /> */}
          <PaginatedItems
            items={[...Array(100).keys()]}
            itemsPerPage={itemsPerPage}
          />
        </div>
        {/* End table */}
      </div>
      {/* End content */}
    </React.Fragment>
  );
}

export default AppreciationManagementPage;
