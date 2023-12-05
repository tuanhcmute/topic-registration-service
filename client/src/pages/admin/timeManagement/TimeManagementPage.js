import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { BiMessageRoundedError } from "react-icons/bi";
import { Button, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFilter } from "react-icons/ai";
import _ from "lodash";
import { MdOutlineAddComment } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import AddTimeModal from "./components/AddTimeModal";
import EditTimeModal from "./components/EditTimeModal";
import { topicStatus, topicType } from "../../../utils/constants";
import { Dropdown } from "../../../components/dropdown1";
import ListEnrollmentPeriodModal from "./components/ListEnrollmentPeriodModal";
import {
  createNewTopicInLectureEnrollmentPeriod,
  updateTopicInLectureEnrollmentPeriod,
} from "../../../features/topic";
import AddEnrollmentPeriodModal from "./components/AddEnrollmentPeriodModal";

function TimeManagementPage() {
  const [openModal, setOpenModal] = useState(undefined);
  const [openEditTopicModal, setOpenEditTopicModal] = useState(undefined);
  const [openApprovalTopicModal, setOpenApprovalTopicModal] =
    useState(undefined);
  const [openAddEnrollmentPeriodModal, setOpenAddEnrollmentPeriodModal] =
    useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicStatusFilter, setTopicStatusFilter] = useState(
    topicStatus.all.value
  );
  // Get current user from redux
  const studentOptions = useSelector(
    (state) => state.user?.studentsNotEnrolledInTopic
  );
  const dispatch = useDispatch();

  async function handleCreateNewTopicInLectureEnrollmentPeriod(data) {
    dispatch(
      createNewTopicInLectureEnrollmentPeriod({
        data,
        setOpenModal,
        type: topicType.TLCN,
      })
    );
  }
  async function handleUpdateTopicInLectureEnrollmentPeriod(data) {
    dispatch(
      updateTopicInLectureEnrollmentPeriod({
        data,
        type: topicType.TLCN,
        setOpenEditTopicModal,
      })
    );
  }

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            DANH SÁCH THỜI GIAN
          </span>
          <Button
            color='gray'
            className='rounded-md p-0'
            onClick={() => setOpenModal("default")}
          >
            Thêm mới
          </Button>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='m-3 flex gap-2'>
          <TextInput className='w-full' placeholder='Nhập học kỳ...' />
          <Button
            color='gray'
            className='rounded-md p-0 md:w-1/6 sm:w-1/5 w-1/3'
            // onClick={() => setOpenModal("default")}
          >
            Tìm kiếm
          </Button>
        </div>
        {/* End select */}
        {/* Topic status filter */}
        <div className='px-3 py-1 flex gap-2'>
          <div className='w-fit' id='topicStatusFilter'>
            <Button
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Lọc theo trạng thái</span>
            </Button>
          </div>
          <div className='w-fit' id='topicStatusFilter'>
            <Button
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Lọc theo năm học</span>
            </Button>
          </div>
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
                        <th className='p-3 text-center border'>Học kỳ</th>
                        <th className='p-3 text-center border'>Trạng thái</th>
                        <th className='p-3 text-center border'>Bắt đầu</th>
                        <th className='p-3 text-center border'>kết thúc</th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {/* {topics
                        ?.filter((item) => {
                          if (
                            _.isEqual(topicStatusFilter, topicStatus.all.value)
                          )
                            return true;
                          return item?.status === topicStatusFilter;
                        }) */}
                      {[1, 2, 3, 4, 5]?.map((item, index) => {
                        let statusColor = "";
                        if (
                          _.isEqual(item?.status, topicStatus.approved.value)
                        ) {
                          statusColor = "bg-green-200";
                        }
                        if (
                          _.isEqual(item?.status, topicStatus.rejected.value)
                        ) {
                          statusColor = "bg-red-300";
                        }
                        if (
                          _.isEqual(item?.status, topicStatus.pending.value)
                        ) {
                          statusColor = "bg-teal-200";
                        }
                        if (
                          _.isEqual(item?.status, topicStatus.updated.value)
                        ) {
                          statusColor = "bg-teal-200";
                        } else statusColor = "bg-teal-200";
                        return (
                          <tr
                            className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'
                            key={item.id}
                          >
                            <td className='p-3 text-center whitespace-nowrap border'>
                              {index + 1}
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                              <p className='font-normal'>
                                HKI năm học 2023 - 2024
                              </p>
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey'>
                              <p className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                ACTIVATED
                              </p>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span
                                className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl`}
                              >
                                21/08/2023
                              </span>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                18/12/2023
                              </span>
                            </td>
                            <td className='border border-collapse border-lightGrey'>
                              <div className='flex justify-center flex-col gap-3 items-center m-2'>
                                <BsThreeDots
                                  className='w-6 h-6 cursor-pointer'
                                  id='actions'
                                />
                              </div>
                              <Dropdown
                                place='right-right'
                                className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
                                anchorSelect='#actions'
                              >
                                <div className='flex flex-col gap-3 p-3'>
                                  <div
                                    className='flex items-center gap-1 cursor-pointer'
                                    onClick={() => {
                                      setSelectedTopic(item);
                                      setOpenEditTopicModal("default");
                                    }}
                                  >
                                    <LiaEditSolid className='w-6 h-6 cursor-pointer' />
                                    <p>Chỉnh sửa học kỳ</p>
                                  </div>
                                  <div
                                    className='flex items-center gap-1 cursor-pointer'
                                    onClick={() => {
                                      setSelectedTopic(item);
                                      setOpenApprovalTopicModal("default");
                                    }}
                                  >
                                    <BiMessageRoundedError className='w-6 h-6 cursor-pointer' />
                                    <p>DS Khoảng thời gian</p>
                                  </div>
                                  <div
                                    className='flex items-center gap-1 cursor-pointer'
                                    onClick={() => {
                                      setSelectedTopic(item);
                                      setOpenAddEnrollmentPeriodModal(
                                        "default"
                                      );
                                    }}
                                  >
                                    <MdOutlineAddComment className='w-6 h-6 cursor-pointer' />
                                    <p>Thêm khoảng thời gian</p>
                                  </div>
                                </div>
                              </Dropdown>
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
      <AddTimeModal
        options={studentOptions}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleNewTopic={handleCreateNewTopicInLectureEnrollmentPeriod}
      />
      <EditTimeModal
        options={studentOptions}
        handleUpdateTopic={handleUpdateTopicInLectureEnrollmentPeriod}
        data={selectedTopic}
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicModal}
      />
      <ListEnrollmentPeriodModal
        data={selectedTopic}
        openModal={openApprovalTopicModal}
        setOpenModal={setOpenApprovalTopicModal}
      />
      <AddEnrollmentPeriodModal
        openModal={openAddEnrollmentPeriodModal}
        setOpenModal={setOpenAddEnrollmentPeriodModal}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default TimeManagementPage;
