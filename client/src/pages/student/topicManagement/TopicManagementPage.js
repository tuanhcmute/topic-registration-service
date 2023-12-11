import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFilter } from "react-icons/ai";
import { IoMdCloseCircleOutline, IoMdPersonAdd } from "react-icons/io";
import _ from "lodash";

import EditTopicModal from "./components/EditTopicModal";
import { positionType, topicStatus, topicType } from "../../../utils/constants";
import { Dropdown } from "../../../components/dropdown1";
import {
  fetchAllApprovedTopicsInStudentEnrollmentPeriod,
  updateTopicInLectureEnrollmentPeriod,
} from "../../../features/topic";
import { fetchStudentsNotEnrolledInTopic } from "../../../features/user";
import { fetchActivatedEnrollmentPeriod } from "../../../features/enrollmentPeriod";
import { fetchTopicEnrollmentsByNtid } from "../../../features/topicEnrollment/topicEnrollmentAction";
import CancelEnrollmentTopicModal from "./components/CancelEnrollmentTopicModal";
import AddMemberEnrollmentTopicModal from "./components/AddMemberEnrollmentTopicModal";

function TopicManagementPage() {
  const [openEditTopicModal, setOpenEditTopicModal] = useState(undefined);
  const [openCancelEnrollmentTopicModal, setOpenCancelEnrollmentTopicModal] =
    useState(undefined);
  const [
    openAddMemberEnrollmentTopicModal,
    setOpenAddMemberEnrollmentTopicModal,
  ] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicEnrollment, setSelectedTopicEnrollment] = useState(null);
  const [topicStatusFilter, setTopicStatusFilter] = useState(
    topicStatus.all.value
  );
  // Get current user from redux
  const currentUser = useSelector((state) => state.user?.currentUser);
  const topics = useSelector((state) => state.topic?.approvedTopics);
  const studentOptions = useSelector(
    (state) => state.user?.studentsNotEnrolledInTopic
  );
  const enrollmentPeriod = useSelector(
    (state) => state.enrollmentPeriod?.enrollmentPeriod
  );
  const topicEnrollments = useSelector(
    (state) => state?.topicEnrollment?.topicEnrollments
  );
  const dispatch = useDispatch();

  async function handleUpdateTopicInLectureEnrollmentPeriod(data) {
    dispatch(
      updateTopicInLectureEnrollmentPeriod({
        data,
        type: topicType.TLCN,
        setOpenEditTopicModal,
      })
    );
  }

  useEffect(() => {
    // Fetch topics
    if (_.isEmpty(topics) || _.isNull(topics) || _.isUndefined(topics)) {
      dispatch(
        fetchAllApprovedTopicsInStudentEnrollmentPeriod({
          type: topicType.TLCN,
        })
      );
    }

    // Fetch student options
    if (
      _.isEmpty(studentOptions) ||
      _.isNull(studentOptions) ||
      _.isUndefined(studentOptions)
    ) {
      dispatch(fetchStudentsNotEnrolledInTopic());
    }

    // Fetch enrollment period
    if (
      _.isEmpty(enrollmentPeriod) ||
      _.isNull(enrollmentPeriod) ||
      _.isUndefined(enrollmentPeriod)
    ) {
      dispatch(
        fetchActivatedEnrollmentPeriod({
          topicType: topicType.TLCN,
        })
      );
    }
    dispatch(fetchTopicEnrollmentsByNtid());
  }, []);

  console.log(topicEnrollments);

  return (
    <div className='flex flex-col gap-10 w-full'>
      <div className=' border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
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
                        <th className='p-3 text-center border'>Số SVTH</th>
                        <th className='p-3 text-center border'>SL còn lại</th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {topics
                        ?.filter((item) => {
                          if (
                            _.isEqual(topicStatusFilter, topicStatus.all.value)
                          )
                            return true;
                          return item?.status === topicStatusFilter;
                        })
                        ?.map((item, index) => {
                          let statusColor = "bg-teal-200";
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
                                    {item?.lecture?.ntid}
                                  </span>
                                  <span className='block mt-2 font-normal'>
                                    {item?.lecture?.name}
                                  </span>
                                </div>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span
                                  className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl`}
                                >
                                  {item?.maxSlot}
                                </span>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item?.availableSlot}
                                </span>
                              </td>
                              <td className='border border-collapse border-lightGrey'>
                                <div className='flex justify-center flex-wrap gap-1 items-center m-2'>
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
          {/* <PaginatedItems items={[...Array(20).keys()]} itemsPerPage={10} /> */}
        </div>
        {/* End table */}
      </div>
      <div className=' border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            ĐỀ TÀI ĐÃ ĐĂNG KÝ
          </span>
        </div>
        {/* End register topic */}
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
                        <th className='p-3 text-center border'>SVTH</th>
                        <th className='p-3 text-center border'>Vị trí</th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {topicEnrollments?.map((item, index) => {
                        let statusColor = "bg-teal-200";
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
                              <div className=''>
                                <span className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item?.topic?.lecture?.ntid}
                                </span>
                                <span className='block mt-2 font-normal'>
                                  {item?.topic?.lecture?.name}
                                </span>
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <div className='flex flex-col gap-2'>
                                <span className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl block w-fit'>
                                  {item?.student?.ntid}
                                </span>
                                <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl block w-fit'>
                                  {item?.student?.name}
                                </span>
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span
                                className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl`}
                              >
                                {item?.isLeader
                                  ? positionType.LEADER.label
                                  : positionType.MEMBER.label}
                              </span>
                            </td>
                            <td className='border border-collapse border-lightGrey'>
                              {(currentUser?.ntid === item?.student?.ntid ||
                                !item?.isLeader) && (
                                <>
                                  <div className='flex justify-center flex-wrap gap-1 items-center m-2'>
                                    <LiaEditSolid
                                      className='w-6 h-6 cursor-pointer'
                                      id={`_${item?.id}`}
                                    />
                                  </div>
                                  <Dropdown
                                    place='right-right'
                                    className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
                                    anchorSelect={`#_${item?.id}`}
                                  >
                                    <div className='flex flex-col gap-2 p-3'>
                                      {item?.isLeader && (
                                        <div
                                          className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer flex items-center gap-2'
                                          onClick={() => {
                                            setSelectedTopicEnrollment(item);
                                            setOpenAddMemberEnrollmentTopicModal(
                                              "default"
                                            );
                                          }}
                                        >
                                          <IoMdPersonAdd />
                                          <span>Thêm thành viên</span>
                                        </div>
                                      )}

                                      <div
                                        className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer flex items-center gap-2'
                                        onClick={() => {
                                          setSelectedTopicEnrollment(item);
                                          setOpenCancelEnrollmentTopicModal(
                                            "default"
                                          );
                                        }}
                                      >
                                        <IoMdCloseCircleOutline />
                                        Hủy đăng ký
                                      </div>
                                    </div>
                                  </Dropdown>
                                </>
                              )}
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
        <div className='w-full flex justify-end p-3'></div>
        {/* End table */}
      </div>
      {/* Enroll topic modal */}
      <EditTopicModal
        options={studentOptions}
        handleUpdateTopic={handleUpdateTopicInLectureEnrollmentPeriod}
        data={selectedTopic}
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicModal}
      />
      <CancelEnrollmentTopicModal
        openModal={openCancelEnrollmentTopicModal}
        setOpenModal={setOpenCancelEnrollmentTopicModal}
        data={selectedTopicEnrollment}
      />
      <AddMemberEnrollmentTopicModal
        openModal={openAddMemberEnrollmentTopicModal}
        setOpenModal={setOpenAddMemberEnrollmentTopicModal}
        data={selectedTopicEnrollment}
      />
      {/* End content */}
    </div>
  );
}

export default TopicManagementPage;
