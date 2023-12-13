import _ from "lodash";
import { AiOutlineFilter } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { BiMessageRoundedError } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import AddUserModal from "./components/AddUserModal";
import DetailUserModal from "./components/DetailUserModal";
import { topicStatus } from "../../../utils/constants";
import { Dropdown } from "../../../components/dropdown1";
import { roleCode } from "../../../utils/constants/roles";
import { createUser, fetchAllUsers } from "../../../features/user";
import { PaginatedItems } from "../../../components/pagination";

function UserManagementPage() {
  const [openAddUserModal, setOpenAddUserModal] = useState(undefined);
  const [openDetailUserModal, setOpenDetailUserModal] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(roleCode.ROLE_ALL.value);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("createdDate");

  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.user?.pageData);
  console.log(pageData);

  function handleCreateUser(requestData) {
    dispatch(createUser({ data: requestData, setOpenAddUserModal }));
  }

  function handlePageClick(newOffset) {
    console.log({ newOffset });
    setPageNumber(newOffset);
  }

  useEffect(() => {
    dispatch(fetchAllUsers({ pageNumber, itemsPerPage, sortBy }));
  }, [pageNumber, itemsPerPage, sortBy]);

  return (
    <React.Fragment>
      <div className='w-full border border-lightGrey bg-white h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
        {/* Register topic */}
        <div className='flex items-center justify-between p-3 border-b border-lightGrey'>
          <span className='uppercase font-bold text-base text-primary dark:text-gray-100'>
            DANH SÁCH NGƯỜI DÙNG
          </span>
          <Button color='gray' className='rounded-md p-0' id='addUserMethod'>
            Thêm mới
          </Button>
          <Dropdown
            place='right-right'
            className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
            anchorSelect='#addUserMethod'
          >
            <div className='flex flex-col gap-2 p-3'>
              <div
                className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                onClick={() => setOpenAddUserModal("default")}
              >
                Thêm thủ công
              </div>
              <div className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'>
                Import excel
              </div>
            </div>
          </Dropdown>
        </div>
        {/* End register topic */}
        {/* Select */}
        <div className='m-3 flex gap-2'>
          <TextInput className='w-full' placeholder='Nhập tên người dùng...' />
          <Button
            color='gray'
            className='rounded-md p-0 md:w-1/6 sm:w-1/5 w-1/3'
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
              <span>Lọc theo loại người dùng</span>
            </Button>
          </div>
          <div className='w-fit'>
            <Button
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Lọc theo ngành</span>
            </Button>
          </div>
          <div className='w-fit'>
            <Button
              id='itemsPerPage'
              color='gray'
              className='rounded-md p-0 cursor-default flex items-center'
            >
              <AiOutlineFilter className='mr-1' />
              <span>Hiển thị</span>
            </Button>
          </div>
        </div>

        <Dropdown
          place='right-right'
          className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
          anchorSelect='#topicStatusFilter'
        >
          <div className='flex flex-col gap-2 p-3'>
            {Object.keys(roleCode).map((item) => {
              return (
                <div
                  key={roleCode[item].value}
                  className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                  onClick={() => setRoleFilter(roleCode[item]?.value)}
                >
                  {roleCode[item].label}
                </div>
              );
            })}
          </div>
        </Dropdown>

        <Dropdown
          place='right-right'
          className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
          anchorSelect='#itemsPerPage'
        >
          <div className='flex flex-col gap-2 p-3'>
            {[...Array(5).keys()]
              .filter((item) => item !== 0)
              .map((item) => {
                return (
                  <div
                    key={item}
                    className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                    onClick={() => setItemsPerPage(item * 5)}
                  >
                    {item * 5} người dùng
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
                        <th className='p-3 text-center border'>Ntid</th>
                        <th className='p-3 text-center border'>
                          Tên người dùng
                        </th>
                        <th className='p-3 text-center border w-3'>Email</th>
                        <th className='p-3 text-center border'>
                          Loại người dùng
                        </th>
                        <th className='py-3 px-6 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {pageData?.users
                        ?.filter((item) => {
                          if (_.isEqual(roleFilter, roleCode?.ROLE_ALL?.value))
                            return true;
                          return item?.userRoles?.some(
                            (item2) => item2 === roleFilter
                          );
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
                              key={item.ntid}
                            >
                              <td className='p-3 text-center whitespace-nowrap border w-4'>
                                {index + 1}
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey w-20'>
                                <span className='bg-pink-200 dark:bg-gray-300 py-1 px-2 text-sm font-normal rounded dark:text-black-pearl'>
                                  {item?.ntid}
                                </span>
                              </td>
                              <td className='p-3 text-left border border-collapse border-lightGrey'>
                                <p className='font-normal'>{item?.name}</p>
                              </td>
                              <td className='p-3 border border-collapse border-lightGrey w-48'>
                                <p
                                  className={`${statusColor} py-1 px-3 text-sm font-medium rounded dark:text-black-pearl break-all`}
                                >
                                  {item?.email}
                                </p>
                              </td>
                              <td className='p-3 text-center border border-collapse border-lightGrey w-36'>
                                <div className='flex gap-2 flex-col'>
                                  {item?.userRoles?.map((item) => {
                                    return (
                                      <p className='w-fit bg-orange-200 py-1 px-3 text-sm font-normal rounded dark:text-black-pearl'>
                                        {roleCode[item]?.label}
                                      </p>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className='border border-collapse border-lightGrey w-20'>
                                <div className='flex justify-center flex-col gap-3 items-center m-2'>
                                  <BsThreeDots
                                    className='w-6 h-6 cursor-pointer'
                                    id={`actions-${item?.ntid}`}
                                  />
                                </div>
                                <Dropdown
                                  place='right-right'
                                  className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
                                  anchorSelect={`#actions-${item?.ntid}`}
                                >
                                  <div className='flex flex-col gap-3 p-3'>
                                    <div
                                      className='flex items-center gap-1 cursor-pointer'
                                      onClick={() => {
                                        setSelectedUser(item);
                                        setOpenDetailUserModal("default");
                                      }}
                                    >
                                      <BiMessageRoundedError className='w-6 h-6 cursor-pointer' />
                                      <p>Xem chi tiết</p>
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
          <PaginatedItems
            items={[...Array(pageData?.totalElements).keys()]}
            itemsPerPage={itemsPerPage}
            onPageClick={handlePageClick}
          />
        </div>
        {/* End table */}
      </div>
      {/* Enroll topic modal */}
      <AddUserModal
        openModal={openAddUserModal}
        setOpenModal={setOpenAddUserModal}
        createUser={handleCreateUser}
      />
      <DetailUserModal
        data={selectedUser}
        openModal={openDetailUserModal}
        setOpenModal={setOpenDetailUserModal}
      />
      {/* End content */}
    </React.Fragment>
  );
}

export default UserManagementPage;
