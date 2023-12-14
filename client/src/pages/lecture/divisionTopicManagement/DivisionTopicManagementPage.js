import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFilter } from "react-icons/ai";

import { topicStatus, topicType } from "../../../utils/constants";
import { fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod } from "../../../features/topic";
import DivisionTopicModal from "./components/DivisionTopicModal";
import { fetchAllLectures } from "../../../features/user";
import { fetchActivatedEnrollmentPeriod } from "../../../features/enrollmentPeriod";
import { PaginatedItems } from "../../../components/pagination";

function DivisionTopicManagement() {
  const [openModal, setOpenModal] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicStatusFilter, setTopicStatusFilter] = useState(
    topicStatus.all.value
  );
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("createdDate");
  // Get current user from redux
  const currentUser = useSelector((state) => state.user?.currentUser);
  const approvedTopicsPage = useSelector(
    (state) => state.topic?.approvedTopicsPage
  );
  const enrollmentPeriod = useSelector(
    (state) => state?.enrollmentPeriod?.enrollmentPeriod
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch lectures
    dispatch(fetchAllLectures());

    // Fetch enrollment period
    dispatch(
      fetchActivatedEnrollmentPeriod({
        topicType: topicType.TLCN,
      })
    );
  }, []);

  useEffect(() => {
    // Fetch topics
    dispatch(
      fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod({
        type: topicType.TLCN,
        itemsPerPage,
        pageNumber,
        sortBy,
      })
    );
  }, [itemsPerPage, pageNumber, sortBy, dispatch]);

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            PHÂN CÔNG TIỂU LUẬN CHUYÊN NGÀNH
          </span>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='m-3 border border-gray-400 py-2 px-3 rounded text-sm truncate dark:text-gray-300'>
          {enrollmentPeriod?.name}
        </div>
        {/* End select */}
        {/* Topic status filter */}
        <div className='px-3 py-1 w-fit' id='topicStatusFilter'>
          <Button
            color='gray'
            className='rounded-md p-0 cursor-default flex items-center'
          >
            <AiOutlineFilter className='mr-1' />
            <span>Đề tài chưa phân công</span>
          </Button>
        </div>
        {/* End topic status filter */}
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
                        <th className='p-3 text-center border'>Đề tài</th>
                        <th className='p-3 text-center border'>GVHD</th>
                        <th className='p-3 text-center border'>Trạng thái</th>
                        <th className='p-3 text-center border'>Số SVTH</th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {approvedTopicsPage?.content
                        ?.filter((item) => {
                          if (topicStatusFilter === "ALL") return true;
                          return item?.status === topicStatusFilter;
                        })
                        ?.map((item, index) => {
                          let statusColor = "";
                          if (item?.status === topicStatus.approved.value) {
                            statusColor = "bg-green-200";
                          }
                          if (item?.status === topicStatus.rejected.value) {
                            statusColor = "bg-red-300";
                          }
                          if (item?.status === topicStatus.pending.value) {
                            statusColor = "bg-teal-200";
                          }
                          if (item?.status === topicStatus.updated.value) {
                            statusColor = "bg-teal-200";
                          }
                          return (
                            <tr
                              className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'
                              key={item.id}
                            >
                              <td className='p-3 text-center whitespace-nowrap border'>
                                {index + 1}
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                                <p className='font-normal'>{item.name}</p>
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey'>
                                <div className=''>
                                  <span className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                    {currentUser?.ntid}
                                  </span>
                                  <span className='block mt-2 font-normal'>
                                    {currentUser?.name}
                                  </span>
                                </div>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey bg-'>
                                <span
                                  className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl`}
                                >
                                  {
                                    topicStatus?.[item?.status.toLowerCase()]
                                      ?.label
                                  }
                                </span>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item.maxSlot}
                                </span>
                              </td>
                              <td className='border border-collapse border-lightGrey'>
                                <div className='flex justify-center flex-wrap gap-1 items-center m-2'>
                                  <LiaEditSolid
                                    className='w-6 h-6 cursor-pointer'
                                    onClick={() => {
                                      setSelectedTopic(item);
                                      setOpenModal("default");
                                    }}
                                  />
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
            items={[...Array(approvedTopicsPage?.totalElements).keys()]}
            itemsPerPage={itemsPerPage}
          />
        </div>
        {/* End table */}
      </div>
      {/* Enroll topic modal */}
      <DivisionTopicModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={selectedTopic}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default DivisionTopicManagement;
