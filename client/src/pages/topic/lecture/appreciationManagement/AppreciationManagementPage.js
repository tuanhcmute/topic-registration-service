import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Button } from "flowbite-react";
import Select from "react-select";

import topicService from "../../../../services/topicService";
import { topicStatus, topicType } from "../../../../utils/constants";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";

const options = [
  {
    value: "e71e687d-d5a9-4178-8225-c4b29a9ffb0d",
    label:
      "Đợt phản biện tiểu luận chuyên ngành học kỳ I/2023 (ĐK và duyệt: 23/12 - 30/12/2023)",
  },
];

function AppreciationManagementPage() {
  const [openModal, setOpenModal] = useState(undefined);
  const [openEditTopicModal, setOpenEditTopicMode] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
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

  useEffect(() => {
    fetchTopicsInLectureEnrollmentPeriod();
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
            Xuất Excel
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
                                  {currentUser?.ntid}
                                </span>
                                <span className='block mt-2 font-normal'>
                                  {currentUser?.name}
                                </span>
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey flex flex-col gap-2'>
                              <span className='bg-orange-400 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl'>
                                Thứ 3, 8 - 9h
                              </span>
                              <span className='bg-orange-400 py-1 px-3 text-sm font-medium rounded dark:text-black-pearl'>
                                20/05/2023
                              </span>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                A3-302
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
      {/* <EnrollTopicModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleNewTopic={createNewTopicInLectureEnrollmentPeriod}
      />
      <EditTopicModal
        handleUpdateTopic={updateTopicInLectureEnrollmentPeriod}
        data={selectedTopic}
        openModal={openEditTopicModal}
        setOpenModal={setOpenEditTopicMode}
      /> */}
      {/* End content */}
    </div>
  );
}

export default AppreciationManagementPage;
