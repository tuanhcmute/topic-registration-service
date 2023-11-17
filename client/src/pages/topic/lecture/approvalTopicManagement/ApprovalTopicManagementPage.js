import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import _ from "lodash";

import {
  enrollmentPeriodCodes,
  topicStatus,
  topicType,
} from "../../../../utils/constants";
import ApprovalTopicModal from "./components/ApprovalTopicModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsNotEnrolledInTopic } from "../../../../features/user";
import {
  approveTopicInLectureEnrollmentPeriod,
  fetchAllTopicsInLectureEnrollmentPeriod,
} from "../../../../features/topic";
import { fetchEnrollmentPeriodByTopicTypeAndPeriodCode } from "../../../../features/enrollmentPeriod";

function ApprovalTopicManagementPage() {
  const [openEditTopicModal, setOpenEditTopicModal] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const dispatch = useDispatch();
  const studentOptions = useSelector(
    (state) => state.user?.studentsNotEnrolledInTopic
  );
  const enrollmentPeriod = useSelector(
    (state) => state?.enrollmentPeriod?.enrollmentPeriod
  );
  const topics = useSelector((state) => state.topic?.topics);

  function handleUpdateTopicInLectureEnrollmentPeriod(data) {
    dispatch(
      approveTopicInLectureEnrollmentPeriod({
        values: data,
        setOpenEditTopicModal,
      })
    );
  }

  useEffect(() => {
    dispatch(fetchAllTopicsInLectureEnrollmentPeriod(topicType.TLCN));
    dispatch(fetchStudentsNotEnrolledInTopic());
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
                      {topics?.map((item, index) => {
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
                                <span className='bg-orange-400 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item?.lecture?.ntid}
                                </span>
                                <span className='block mt-2 font-normal'>
                                  {item?.lecture?.name}
                                </span>
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span className='bg-orange-400 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl'>
                                {topicStatus[item?.status.toLowerCase()].label}
                              </span>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                {item.maxSlot}
                              </span>
                            </td>
                            <td className='border border-collapse border-lightGrey'>
                              <div className='flex justify-center'>
                                <LiaEditSolid
                                  className='w-6 h-6 cursor-pointer'
                                  onClick={() => {
                                    setSelectedTopic(item);
                                    setOpenEditTopicModal("default");
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
      {/* Approval topic modal */}
      <ApprovalTopicModal
        options={studentOptions}
        handleUpdateTopic={handleUpdateTopicInLectureEnrollmentPeriod}
        data={selectedTopic}
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicModal}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default ApprovalTopicManagementPage;
