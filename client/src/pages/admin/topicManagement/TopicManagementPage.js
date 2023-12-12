import React, { useEffect, useState } from "react";
import { BiMessageRoundedError } from "react-icons/bi";
import { Button, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFilter } from "react-icons/ai";
import _ from "lodash";

import DetailTopicModal from "./components/DetailTopicModal";
import { topicStatus } from "../../../utils/constants";
import { Dropdown } from "../../../components/dropdown1";
import { fetchAllTopics } from "../../../features/topic";

function TopicManagementPage() {
  const [openDetailTopicModal, setOpenDetailTopicModal] = useState(undefined);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicStatusFilter, setTopicStatusFilter] = useState(
    topicStatus.all.value
  );
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topic?.topics);

  useEffect(() => {
    dispatch(fetchAllTopics());
  }, []);

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            DANH SÁCH ĐỀ TÀI
          </span>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='m-3 flex gap-2'>
          <TextInput className='w-full' placeholder='Nhập tên đề tài...' />
          <Button
            color='gray'
            className='rounded-md p-0 md:w-1/6 sm:w-1/5 w-1/3'
            // onClick={() => setOpenDetailTopicModal("default")}
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
              <span>Lọc theo GVHD</span>
            </Button>
          </div>
          <div className='w-fit' id='topicStatusFilter'>
            <Button
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Lọc theo chuyên ngành</span>
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
          <div className='w-fit' id='topicStatusFilter'>
            <Button
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Lọc theo loại</span>
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
                          if (
                            _.isEqual(topicStatusFilter, topicStatus.all.value)
                          )
                            return true;
                          return item?.status === topicStatusFilter;
                        })
                        ?.map((item, index) => {
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
                                <p className='font-normal'>{item?.name}</p>
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey'>
                                <div className=''>
                                  <span className='block mt-2 font-normal'>
                                    {item?.lecture?.name}
                                  </span>
                                </div>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span
                                  className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl`}
                                >
                                  {
                                    topicStatus[item?.status?.toLowerCase()]
                                      ?.label
                                  }
                                </span>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey'>
                                <span className='bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item?.maxSlot}
                                </span>
                              </td>
                              <td className='border border-collapse border-lightGrey'>
                                <div className='flex justify-center flex-wrap gap-1 items-center m-2'>
                                  <BiMessageRoundedError
                                    className='w-6 h-6 cursor-pointer'
                                    onClick={() => {
                                      setSelectedTopic(item);
                                      setOpenDetailTopicModal("default");
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
      <DetailTopicModal
        data={selectedTopic}
        openModal={openDetailTopicModal}
        setOpenModal={setOpenDetailTopicModal}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default TopicManagementPage;
