import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFilter } from "react-icons/ai";

import {
  enrollmentPeriodCodes,
  topicStatus,
  topicType,
} from "../../../../utils/constants";
import { Dropdown } from "../../../../components/dropdown1";
import { fetchTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor } from "../../../../features/topic";
import DivisionTopicModal from "./components/DivisionTopicModal";
import { fetchLecturesByMajor } from "../../../../features/user";
import _ from "lodash";
import { fetchEnrollmentPeriodByTopicTypeAndPeriodCode } from "../../../../features/enrollmentPeriod";

function DivisionTopicManagement() {
  const [openModal, setOpenModal] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicStatusFilter, setTopicStatusFilter] = useState(
    topicStatus.all.value
  );
  // Get current user from redux
  const currentUser = useSelector((state) => state.user?.currentUser);
  const topics = useSelector((state) => state.topic?.approvedTopics);
  const enrollmentPeriod = useSelector(
    (state) => state?.enrollmentPeriod?.enrollmentPeriod
  );
  const lectures = useSelector((state) => state?.user?.lectures);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch topics
    if (_.isEmpty(topics) || _.isNull(topics) || _.isUndefined(topics)) {
      dispatch(
        fetchTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor({
          type: topicType.TLCN,
          status: topicStatus.approved.value,
        })
      );
    }

    // Fetch lectures
    if (_.isEmpty(lectures) || _.isNull(lectures) || _.isUndefined(lectures)) {
      dispatch(fetchLecturesByMajor(currentUser?.major?.code));
    }

    // Fetch enrollment period
    if (
      _.isEmpty(enrollmentPeriod) ||
      _.isNull(enrollmentPeriod) ||
      _.isUndefined(enrollmentPeriod)
    ) {
      dispatch(
        fetchEnrollmentPeriodByTopicTypeAndPeriodCode({
          topicType: topicType.TLCN,
          periodCode: enrollmentPeriodCodes.LECTURE_ENROLLMENT_PERIOD,
        })
      );
    }
  }, []);

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            TIỂU LUẬN CHUYÊN NGÀNH
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
            <span>Lọc theo trạng thái</span>
          </Button>
        </div>
        <Dropdown
          place='right-right'
          className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
          anchorSelect='#topicStatusFilter'
        >
          <div className='flex flex-col gap-2 p-3'>
            {Object.keys(topicStatus).map((item) => {
              return (
                <div
                  key={item}
                  className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                  onClick={() =>
                    setTopicStatusFilter(topicStatus?.[item]?.value)
                  }
                >
                  {topicStatus?.[item]?.label}
                </div>
              );
            })}
          </div>
        </Dropdown>
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
                      {topics
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
          {/* <PaginatedItems items={[...Array(100).keys()]} itemsPerPage={10} /> */}
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
