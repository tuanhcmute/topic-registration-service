import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { AiOutlineFilter } from "react-icons/ai";

import EnrollTopicModal from "./components/EnrollTopicModal";
import EditTopicModal from "./components/EditTopicModal";
import { topicService, userService } from "../../../../services";
import { topicStatus, topicType } from "../../../../utils/constants";
import { Dropdown } from "../../../../components/dropdown";

const options = [
  {
    value: "e71e687d-d5a9-4178-8225-c4b29a9ffb0d",
    label:
      "Đợt đề xuất tiểu luận chuyên ngành học kỳ I/2023 (ĐK và duyệt: 01/10 - 20/10/2023)",
  },
];

function TopicManagementPage() {
  const [openModal, setOpenModal] = useState(undefined);
  const [openEditTopicModal, setOpenEditTopicMode] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [topicStatusFilter, setTopicStatusFilter] = useState("ALL");
  // Get current user from redux
  const currentUser = useSelector((state) => state.auth?.currentUser);

  async function createNewTopicInLectureEnrollmentPeriod(data) {
    try {
      const response =
        await topicService.createNewTopicInLectureEnrollmentPeriod(data);
      if (response?.data?.statusCode === HttpStatusCode.Created) {
        setOpenModal(undefined);
        fetchTopicsInLectureEnrollmentPeriod();
      }
      if (response?.data?.statusCode === HttpStatusCode.BadRequest) {
        toast.error("Bad request");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchTopicsInLectureEnrollmentPeriod() {
    try {
      const response = await topicService.getAllTopicsInLectureEnrollmentPeriod(
        topicType.TLCN
      );
      const { data } = response;
      if (response?.data?.statusCode === HttpStatusCode.Ok) {
        setTopics(data?.data?.topics);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTopicInLectureEnrollmentPeriod(data) {
    try {
      const response = await topicService.updateTopicInLectureEnrollmentPeriod(
        data
      );
      if (response?.data?.statusCode === HttpStatusCode.Ok) {
        setOpenEditTopicMode(undefined);
        fetchTopicsInLectureEnrollmentPeriod();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchStudentsNotEnrolledInTopic() {
    try {
      const response = await userService.getStudentsNotEnrolledInTopic();
      if (response?.data?.statusCode === HttpStatusCode.Ok) {
        const data = response.data?.data?.students?.map((item) => ({
          value: item?.ntid,
          label: item?.name,
        }));
        setStudentOptions(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTopicsInLectureEnrollmentPeriod();
    fetchStudentsNotEnrolledInTopic();
  }, []);

  return (
    <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            TIỂU LUẬN CHUYÊN NGÀNH
          </span>
          <Button
            color='gray'
            className='rounded-md p-0'
            onClick={() => setOpenModal("default")}
          >
            Đăng ký
          </Button>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='p-3'>
          <Select
            className='w-full'
            options={options}
            isSearchable={false}
            defaultValue={options[0]}
          />
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
          className='p-0 bg-whiteSmoke rounded border-gray-400 dark:bg-sambuca dark:opacity-100 opacity-100'
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
                                    {currentUser?.ntid}
                                  </span>
                                  <span className='block mt-2 font-normal'>
                                    {currentUser?.name}
                                  </span>
                                </div>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-400 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl'>
                                  {
                                    topicStatus?.[item?.status.toLowerCase()]
                                      ?.label
                                  }
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
                                      setOpenEditTopicMode("default");
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
      <EnrollTopicModal
        options={studentOptions}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleNewTopic={createNewTopicInLectureEnrollmentPeriod}
      />
      <EditTopicModal
        options={studentOptions}
        handleUpdateTopic={updateTopicInLectureEnrollmentPeriod}
        data={selectedTopic}
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicMode}
      />
      {/* End content */}
    </div>
  );
}

export default TopicManagementPage;
